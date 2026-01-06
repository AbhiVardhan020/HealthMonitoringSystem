import os

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017"
)

DB_NAME = "health_monitoring_system"

SECRET_KEY = "supersecretkey"
