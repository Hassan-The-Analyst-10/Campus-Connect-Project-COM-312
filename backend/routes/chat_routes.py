# routes/chat_routes.py - REST endpoints for chat
from flask import Blueprint, jsonify
from models.chat_message import ChatMessage
from models.user import User

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/messages", methods=["GET"])
def get_messages():
    messages = ChatMessage.query.order_by(ChatMessage.created_at.asc()).limit(100).all()
    return jsonify([
        {
            "id": m.id,
            "content": m.content,
            "user_id": m.user_id,
            "user_name": m.user.name if m.user else "Unknown",
            "timestamp": m.created_at.isoformat()
        }
        for m in messages
    ])