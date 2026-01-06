from datetime import datetime

class Journal:
    def __init__(
        self,
        userId,
        date,
        mood,
        stress_level,
        sleep_hours,
        symptoms,
        journal_text="",
        ml_prediction=None
    ):
        self.userId = userId
        self.date = date

        self.mood = mood
        self.stress_level = stress_level
        self.sleep_hours = sleep_hours
        self.symptoms = symptoms
        self.journal_text = journal_text

        self.ml_prediction = ml_prediction or {}

        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            "userId": self.userId,
            "date": self.date,
            "mood": self.mood,
            "stress_level": self.stress_level,
            "sleep_hours": self.sleep_hours,
            "symptoms": self.symptoms,
            "journal_text": self.journal_text,
            "ml_prediction": self.ml_prediction,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
