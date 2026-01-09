from flask import Blueprint, request, jsonify
from datetime import datetime, date, timedelta
from bson import ObjectId

from database.mongo import journals_collection, users_collection
from models.JournalModel import Journal
from flask import current_app
import numpy as np


journal_bp = Blueprint("journal", __name__)

@journal_bp.route("/entry", methods=["POST"])
def create_journal_entry():
    data = request.json

    userId = data.get("userId")
    if not userId:
        return jsonify({"error": "userId is required"}), 400

    today = date.today()
    today_str = today.isoformat()
    yesterday_str = (today - timedelta(days=1)).isoformat()

    # 🔹 Check duplicate journal
    existing_entry = journals_collection.find_one({
        "userId": ObjectId(userId),
        "date": today_str
    })

    if existing_entry:
        return jsonify({"error": "Journal entry already exists for today"}), 409

    # 🔹 Fetch user
    user = users_collection.find_one({"_id": ObjectId(userId)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # 1️⃣ Extract fields
    todaySymptoms = data.get("todaySymptoms", {})
    sleep_hours = data.get("sleep")
    stress_level = data.get("stress")
    mood = data.get("mood")
    journal_text = data.get("notes", "")

    # 2️⃣ Create journal object
    journal = Journal(
        userId=ObjectId(userId),
        date=today_str,
        mood=mood,
        stress_level=stress_level,
        sleep_hours=sleep_hours,
        symptoms=todaySymptoms,
        journal_text=journal_text
    )

    journals_collection.insert_one(journal.to_dict())

    # ===============================
    # 🔥 STREAK & USER STATS UPDATE
    # ===============================

    last_journal_date = user.get("last_journal_date")
    current_streak = user.get("streak", 0)
    max_streak = user.get("max_streak", 0)
    total_days = user.get("total_journal_days", 0)

    # 🔹 Determine streak
    if last_journal_date == yesterday_str:
        current_streak += 1
    else:
        current_streak = 1

    # 🔹 Update max streak
    max_streak = max(max_streak, current_streak)

    # 🔹 Update user document
    users_collection.update_one(
        {"_id": ObjectId(userId)},
        {
            "$set": {
                "streak": current_streak,
                "max_streak": max_streak,
                "last_journal_date": today_str,
                "updated_at": datetime.utcnow()
            },
            "$inc": {
                "total_journal_days": 1
            }
        }
    )

    return jsonify({
        "message": "Journal entry saved successfully",
        "streak": current_streak,
        "max_streak": max_streak,
        "total_journal_days": total_days + 1
    }), 201




@journal_bp.route("/entry", methods=["GET"])
def get_journal_entry():
    userId = request.args.get("userId")
    date_str = request.args.get("date")

    if not userId or not date_str:
        return jsonify({"error": "Missing parameters"}), 400

    entry = journals_collection.find_one({
        "userId": ObjectId(userId),
        "date": date_str
    })

    if not entry:
        return jsonify({"exists": False}), 200

    entry["_id"] = str(entry["_id"])
    entry["userId"] = str(entry["userId"])

    return jsonify({
        "exists": True,
        "entry": entry
    })
