#!/usr/bin/env python
"""Initialize database with all tables and test data"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from extensions import db
from flask import Flask
from flask_cors import CORS

# Create minimal app for initialization
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///campus_connect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Define models here to avoid import issues
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(50), default="student")
    password = db.Column(db.String(200), nullable=False)
    profile_picture = db.Column(db.String(500), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    department = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

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

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    room = db.Column(db.String(100), default="general")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default="sent")

class Notification(db.Model):
    __tablename__ = "notifications"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), default="info")
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

def init_database():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        print("✓ Dropped all existing tables")
        
        # Create all tables
        db.create_all()
        print("✓ Created all tables")
        
        from werkzeug.security import generate_password_hash
        
        # Create test student
        test_student = User(
            name="Test Student",
            email="test@example.com",
            role="student",
            password=generate_password_hash("password123"),
            department="Computer Science",
            bio="Test student user"
        )
        db.session.add(test_student)
        print("✓ Created test student")
        
        # Create test admin
        test_admin = User(
            name="Admin User",
            email="admin@example.com",
            role="admin",
            password=generate_password_hash("admin123"),
            department="Administration",
            bio="System Administrator"
        )
        db.session.add(test_admin)
        print("✓ Created test admin")
        
        # Create sample announcements
        announcements = [
            Announcement(
                title="Welcome to Campus Connect!",
                message="Welcome to our new platform! Here you can collaborate with peers, submit requests, and stay updated.",
                created_by=2
            ),
            Announcement(
                title="Collaboration Hub Live",
                message="The Collaboration Hub is now active! Chat with other students in real-time.",
                created_by=2
            )
        ]
        
        for announcement in announcements:
            db.session.add(announcement)
        print("✓ Created sample announcements")
        
        db.session.commit()
        print("\n" + "="*50)
        print("✅ Database initialized successfully!")
        print("="*50)
        print("\nTest Accounts:")
        print("  Student: test@example.com / password123")
        print("  Admin: admin@example.com / admin123")
        print("\nNow run: python app.py")

if __name__ == "__main__":
    init_database()