from flask import Blueprint, request, jsonify
from datetime import datetime, date
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

    today_str = date.today().isoformat()

    existing_entry = journals_collection.find_one({
        "userId": ObjectId(userId),
        "date": today_str
    })

    if existing_entry:
        return jsonify({"error": "Journal entry already exists for today"}), 409

    # 1️⃣ Extract fields
    todaySymptoms = data.get("todaySymptoms", {})
    sleep_hours = data.get("sleep")
    stress_level = data.get("stress")
    mood = data.get("mood")
    journal_text = data.get("notes", "")

    # 2️⃣ Convert symptoms → ML input
    positive_symptoms = [
        name.lower() for name, value in todaySymptoms.items() if value == 1
    ]

    ml_prediction = {}
    system = current_app.ml_system

    # 3️⃣ Run ML prediction (safe guard)
    if positive_symptoms:
        disease, probabilities = system.predict_disease_from_names(positive_symptoms)

        top_3_indices = np.argsort(probabilities)[-3:][::-1]

        top_predictions = []
        for idx in top_3_indices:
            top_predictions.append({
                "disease": system.label_encoder.inverse_transform([idx])[0],
                "probability": float(probabilities[idx])
            })

        ml_prediction = {
            "predicted_disease": disease,
            "top_predictions": top_predictions
        }

    # 4️⃣ Create journal object
    journal = Journal(
        userId=ObjectId(userId),
        date=today_str,
        mood=mood,
        stress_level=stress_level,
        sleep_hours=sleep_hours,
        symptoms=todaySymptoms,
        journal_text=journal_text,
        ml_prediction=ml_prediction
    )

    journals_collection.insert_one(journal.to_dict())

    return jsonify({
        "message": "Journal entry saved successfully",
        "ml_prediction": ml_prediction
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
