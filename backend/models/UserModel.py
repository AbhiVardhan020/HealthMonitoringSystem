from datetime import datetime

class User:
    def __init__(self, name, email, password, age):
        self.name = name
        self.email = email
        self.password = password  # hashed password
        self.age = age

        # journaling stats
        self.streak = 0
        self.total_journal_days = 0
        self.last_journal_date = None

        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "age": self.age,

            "streak": self.streak,
            "total_journal_days": self.total_journal_days,
            "last_journal_date": self.last_journal_date,

            "created_at": self.created_at
        }

    @staticmethod
    def serialize(user):
        return {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "age": user["age"],
            "streak": user.get("streak", 0),
            "total_journal_days": user.get("total_journal_days", 0),
            "last_journal_date": user.get("last_journal_date"),
            "created_at": user["created_at"]
        }
