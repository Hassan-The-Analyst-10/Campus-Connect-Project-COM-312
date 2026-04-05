from datetime import datetime
from extensions import db  # Change this line

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    room = db.Column(db.String(100), default="general")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default="sent")  # sent, delivered, seen
    
    # Relationship
    user = db.relationship("User", backref="chat_messages", foreign_keys=[user_id])
    
    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "user_name": self.user.name if self.user else "Unknown",
            "room": self.room,
            "timestamp": self.created_at.isoformat() if self.created_at else None,
            "status": self.status
        }