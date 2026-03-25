from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from extensions import db
from models.user import User

oauth_bp = Blueprint("oauth", __name__)

# 🔐 Replace with your Google Client ID
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"

@oauth_bp.route("/google", methods=["POST"])
def google_login():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"message": "Missing token"}), 400

    try:
        # ✅ Verify token with Google
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]
        name = idinfo.get("name", "")

        # 🔍 Check if user exists
        user = User.query.filter_by(email=email).first()

        if not user:
            # ✅ Create new user
            user = User(
                name=name,
                email=email,
                password=None,
                auth_provider="google"
            )
            db.session.add(user)
            db.session.commit()

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }), 200

    except ValueError:
        return jsonify({"message": "Invalid Google token"}), 401