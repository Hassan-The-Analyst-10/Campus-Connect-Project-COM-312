# Alternative app.py without WebSocket (using polling only)
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///campus_connect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Update this
app.config['MAIL_PASSWORD'] = 'your_password'  # Update this

db = SQLAlchemy(app)
mail = Mail(app)

# Models
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(50), default="student")
    password = db.Column(db.String(200), nullable=False)

class Announcement(db.Model):
    __tablename__ = "announcements"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"))

class ServiceRequest(db.Model):
    __tablename__ = "service_requests"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", backref="requests")

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    room = db.Column(db.String(100), default="general")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship("User", backref="messages")

# Routes
@app.route("/api/announcements/", methods=["GET"])
def get_announcements():
    announcements = Announcement.query.order_by(Announcement.created_at.desc()).all()
    return jsonify([
        {
            "id": a.id,
            "title": a.title,
            "message": a.message,
            "created_at": a.created_at.isoformat() if a.created_at else None
        }
        for a in announcements
    ])

@app.route("/api/announcements/", methods=["POST"])
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

@app.route("/api/requests/", methods=["POST"])
def create_request():
    data = request.json
    
    # Check for pending requests limit
    user_id = data["user_id"]
    pending_count = ServiceRequest.query.filter_by(user_id=user_id, status="Pending").count()
    
    if pending_count >= 5:
        return jsonify({"error": "Too many pending requests. Please wait for feedback."}), 403
    elif pending_count >= 3:
        return jsonify({"warning": "You have 3 pending requests. Consider waiting for feedback."}), 429
    
    service_request = ServiceRequest(
        title=data["title"],
        description=data["description"],
        user_id=user_id
    )
    
    db.session.add(service_request)
    db.session.commit()
    
    return jsonify({"message": "Request submitted"}), 201

@app.route("/api/requests/", methods=["GET"])
def get_requests():
    requests = ServiceRequest.query.order_by(ServiceRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "created_at": r.created_at.isoformat() if r.created_at else None,
            "user_name": r.user.name if r.user else "Unknown"
        }
        for r in requests
    ])

@app.route("/api/requests/user/<int:user_id>", methods=["GET"])
def get_user_requests(user_id):
    requests = ServiceRequest.query.filter_by(user_id=user_id).order_by(ServiceRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "created_at": r.created_at.isoformat() if r.created_at else None
        }
        for r in requests
    ])

@app.route("/api/requests/<int:request_id>", methods=["PUT"])
def update_request_status(request_id):
    data = request.json
    service_request = ServiceRequest.query.get_or_404(request_id)
    service_request.status = data["status"]
    db.session.commit()
    return jsonify({"message": "Request status updated"})

@app.route("/api/chat/messages", methods=["GET"])
def get_messages():
    messages = ChatMessage.query.order_by(ChatMessage.created_at.asc()).limit(100).all()
    return jsonify([
        {
            "id": m.id,
            "content": m.content,
            "user_id": m.user_id,
            "user_name": m.user.name if m.user else "Unknown",
            "timestamp": m.created_at.isoformat() if m.created_at else None
        }
        for m in messages
    ])

@app.route("/api/chat/messages", methods=["POST"])
def send_message():
    data = request.json
    message = ChatMessage(
        content=data["content"],
        user_id=data["user_id"],
        room="general"
    )
    db.session.add(message)
    db.session.commit()
    return jsonify({"message": "Message sent"}), 201

# Create tables
with app.app_context():
    db.create_all()
    
    # Create test user if not exists
    if not User.query.filter_by(email="test@example.com").first():
        test_user = User(
            name="Test Student",
            email="test@example.com",
            role="student",
            password="password123"
        )
        db.session.add(test_user)
        
        admin_user = User(
            name="Admin User",
            email="admin@example.com",
            role="admin",
            password="admin123"
        )
        db.session.add(admin_user)
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True, port=5000)