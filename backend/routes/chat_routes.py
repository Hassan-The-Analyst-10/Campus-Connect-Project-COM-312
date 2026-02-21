from flask import Blueprint, request, jsonify
from models import db
from models.chat_message import ChatMessage
from models.user import User

chat_bp = Blueprint("chat", __name__)

# Get all messages
@chat_bp.route("/messages", methods=["GET"])
def get_messages():
    messages = ChatMessage.query.order_by(ChatMessage.timestamp.asc()).all()

    return jsonify([
        {
            "id": m.id,
            "content": m.content,
            "timestamp": m.timestamp.strftime("%H:%M"),
            "user": {
                "id": m.user.id,
                "name": m.user.name
            }
        } for m in messages
    ])


# Send a message
@chat_bp.route("/messages", methods=["POST"])
def send_message():
    data = request.json

    user = User.query.get(data["user_id"])
    if not user:
        return jsonify({"message": "Invalid user"}), 400

    message = ChatMessage(
        content=data["content"],
        user_id=user.id
    )

    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Sent"}), 201
