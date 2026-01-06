from flask import Blueprint, request, jsonify
from models.UserModel import User
from database.mongo import users_collection

signup_bp = Blueprint("signup", __name__)

@signup_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json

    required_fields = ["name", "email", "password", "age"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # check if user already exists
    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 409

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],  # hash later
        age=data["age"]
    )

    users_collection.insert_one(user.to_dict())

    return jsonify({"message": "Signup successful"}), 201



login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users_collection.find_one({"email": data.get("email")})

    if not user or user["password"] != data.get("password"):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "age": user["age"],
            "streak": user["streak"]
        }
    })
