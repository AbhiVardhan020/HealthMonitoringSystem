from flask import Blueprint, jsonify, request
from bson import ObjectId
from datetime import datetime, timedelta

from database.mongo import db

profile_bp = Blueprint("profile", __name__)
users_collection = db.users
journals_collection = db.journals

@profile_bp.route("/", methods=["GET"])
def get_profile():
    userId = request.args.get("userId")

    if not userId:
        return jsonify({"error": "User ID required"}), 400

    user = users_collection.find_one({"_id": ObjectId(userId)})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # -------- BASIC USER INFO --------
    profile = {
        "name": user["name"],
        "age": user["age"],
        "created_at": user["created_at"],
        "streak": user.get("streak", 0),
        "max_streak": user.get("max_streak", 0),
        "total_journal_days": user.get("total_journal_days", 0),
    }

    # -------- HEALTH SUMMARY (LAST 30 DAYS) --------
    start_date = (datetime.utcnow() - timedelta(days=30)).strftime("%Y-%m-%d")

    entries = list(journals_collection.find({
        "userId": ObjectId(userId),
        "date": {"$gte": start_date}
    }))

    if not entries:
        profile["health_summary"] = {}
        profile["heatmap"] = []
        return jsonify(profile)
    

    # Aggregations
    total_sleep = 0
    total_stress = 0
    mood_count = {}
    symptom_count = {}

    heatmap = []

    for entry in entries:
        total_sleep += entry.get("sleep_hours", 0)
        total_stress += entry.get("stress_level", 0)

        # Mood
        mood = entry.get("mood", {}).get("emoji")
        if mood:
            mood_count[mood] = mood_count.get(mood, 0) + 1

        # Symptoms
        for symptom, value in entry.get("symptoms", {}).items():
            if value == 1:
                symptom_count[symptom] = symptom_count.get(symptom, 0) + 1

        heatmap.append({
            "date": entry["date"],
            "value": 1
        })

    profile["health_summary"] = {
        "avg_sleep": round(total_sleep / len(entries), 1),
        "avg_stress": round(total_stress / len(entries), 1),
        "common_mood": max(mood_count, key=mood_count.get) if mood_count else None,
        "top_symptoms": sorted(
            symptom_count,
            key=symptom_count.get,
            reverse=True
        )[:5]
    }

    profile["heatmap"] = heatmap

    return jsonify(profile), 200
