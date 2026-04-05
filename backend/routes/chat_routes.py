from flask import Blueprint, request, jsonify
from extensions import db
from models.chat_message import ChatMessage

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/messages", methods=["GET"])
def get_messages():
    room = request.args.get("room", "general")
    messages = ChatMessage.query.filter_by(room=room).order_by(ChatMessage.created_at.asc()).limit(100).all()
    return jsonify([m.to_dict() for m in messages])

@chat_bp.route("/messages", methods=["POST"])
def send_message():
    data = request.json
    message = ChatMessage(
        content=data["content"],
        user_id=data["user_id"],
        room=data.get("room", "general"),
        status="sent"
    )
    db.session.add(message)
    db.session.commit()
    
    # Update message status to delivered for all users in room
    message.status = "delivered"
    db.session.commit()
    
    return jsonify(message.to_dict()), 201

@chat_bp.route("/messages/<int:message_id>/delivered", methods=["PUT"])
def mark_as_delivered(message_id):
    message = ChatMessage.query.get_or_404(message_id)
    if message.status == "sent":
        message.status = "delivered"
        db.session.commit()
    return jsonify({"status": message.status})

@chat_bp.route("/messages/<int:message_id>/seen", methods=["PUT"])
def mark_as_seen(message_id):
    message = ChatMessage.query.get_or_404(message_id)
    message.status = "seen"
    db.session.commit()
    return jsonify({"status": message.status})