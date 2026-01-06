from flask import Blueprint, request, jsonify
from datetime import datetime, date
from bson import ObjectId

from database.mongo import journals_collection, users_collection
from models.JournalModel import Journal

journal_bp = Blueprint("journal", __name__)

@journal_bp.route("/entry", methods=["POST"])
def create_journal_entry():
    data = request.json

    # TEMP: hardcoded user (replace with JWT later)
    userId = data.get("userId")
    if not userId:
        return jsonify({"error": "userId is required"}), 400

    today_str = date.today().isoformat()

    # 1️⃣ Enforce one journal per day
    existing_entry = journals_collection.find_one({
        "userId": ObjectId(userId),
        "date": today_str
    })

    if existing_entry:
        return jsonify({"error": "Journal entry already exists for today"}), 409

    # 2️⃣ Extract fields
    todaySymptoms = data.get("todaySymptoms", {})
    sleep_hours = data.get("sleep")
    stress_level = data.get("stress")
    mood = data.get("mood")
    journal_text = data.get("notes", "")

    # 3️⃣ Create journal object
    journal = Journal(
        userId=ObjectId(userId),
        date=today_str,
        mood=mood,
        stress_level=stress_level,
        sleep_hours=sleep_hours,
        symptoms=todaySymptoms,
        journal_text=journal_text
    )

    # 4️⃣ Save journal
    journals_collection.insert_one(journal.to_dict())

    # 5️⃣ (Optional) Update user streak here later

    return jsonify({
        "message": "Journal entry saved successfully"
    }), 201
