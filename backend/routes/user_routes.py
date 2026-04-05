from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models.user import User

user_bp = Blueprint("user", __name__)

@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@user_bp.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    
    if "name" in data:
        user.name = data["name"]
    if "bio" in data:
        user.bio = data["bio"]
    if "phone" in data:
        user.phone = data["phone"]
    if "department" in data:
        user.department = data["department"]
    if "profile_picture" in data:
        user.profile_picture = data["profile_picture"]
    
    db.session.commit()
    return jsonify(user.to_dict())

@user_bp.route("/<int:user_id>/change-password", methods=["PUT"])
def change_password(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    
    if not check_password_hash(user.password, data["current_password"]):
        return jsonify({"error": "Current password is incorrect"}), 401
    
    user.password = generate_password_hash(data["new_password"])
    db.session.commit()
    return jsonify({"message": "Password updated successfully"})