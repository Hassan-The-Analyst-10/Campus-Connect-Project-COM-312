# models/chat_message.py - Chat message model
from datetime import datetime
from . import db

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    room = db.Column(db.String(100), default="general")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship("User", backref="messages")