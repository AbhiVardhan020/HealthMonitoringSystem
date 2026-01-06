from flask import Flask, request, jsonify
from flask_cors import CORS
from database.mongo import users_collection
from models.UserModel import User
from routes.journal.journal import journal_bp
from routes.auth.auth import signup_bp, login_bp

app = Flask(__name__)
CORS(app)


app.register_blueprint(signup_bp, url_prefix="/api/auth")
app.register_blueprint(login_bp, url_prefix="/api/auth")
app.register_blueprint(journal_bp, url_prefix="/api/journal")


if __name__ == "__main__":
    app.run(debug=True)
