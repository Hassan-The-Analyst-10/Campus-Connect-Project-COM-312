from flask import Blueprint, request, jsonify
from extensions import db
from models.notification import Notification
from models.user import User

notification_bp = Blueprint("notifications", __name__)

@notification_bp.route("/", methods=["GET"])
def get_notifications():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id required"}), 400
    
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    unread_count = Notification.query.filter_by(user_id=user_id, is_read=False).count()
    
    return jsonify({
        "notifications": [n.to_dict() for n in notifications],
        "unread_count": unread_count
    })

@notification_bp.route("/<int:notification_id>/read", methods=["PUT"])
def mark_as_read(notification_id):
    notification = Notification.query.get_or_404(notification_id)
    notification.is_read = True
    db.session.commit()
    return jsonify({"message": "Marked as read"})

@notification_bp.route("/read-all", methods=["PUT"])
def mark_all_as_read():
    user_id = request.json.get("user_id")
    Notification.query.filter_by(user_id=user_id, is_read=False).update({"is_read": True})
    db.session.commit()
    return jsonify({"message": "All notifications marked as read"})

@notification_bp.route("/", methods=["POST"])
def create_notification():
    data = request.json
    notification = Notification(
        user_id=data["user_id"],
        title=data["title"],
        message=data["message"],
        type=data.get("type", "info")
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify(notification.to_dict()), 201