from flask import Blueprint, jsonify
from models.user import User

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()

    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        } for u in users
    ])
