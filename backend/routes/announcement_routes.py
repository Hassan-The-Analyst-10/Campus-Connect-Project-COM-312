from flask import Blueprint, request, jsonify
from models import db
from models.announcement import Announcement

announcement_bp = Blueprint("announcements", __name__)

@announcement_bp.route("/", methods=["GET"])
def get_announcements():
    announcements = Announcement.query.order_by(
        Announcement.created_at.desc()
    ).all()

    return jsonify([
        {
            "id": a.id,
            "title": a.title,
            "message": a.message,
            "created_at": a.created_at
        }
        for a in announcements
    ])


@announcement_bp.route("/", methods=["POST"])
def create_announcement():
    data = request.json

    announcement = Announcement(
        title=data["title"],
        message=data["message"],
        created_by=data["created_by"]
    )

    db.session.add(announcement)
    db.session.commit()

    return jsonify({"message": "Announcement created"}), 201
