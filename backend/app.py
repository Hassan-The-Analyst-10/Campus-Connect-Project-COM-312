from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

from extensions import db, mail

# 👇 CREATE APP
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:5175", "http://127.0.0.1:5173", "http://127.0.0.1:5175"])

# =========================
# CONFIG
# =========================
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///campus_connect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Update this
app.config['MAIL_PASSWORD'] = 'your_password'  # Update this
app.config['SECRET_KEY'] = 'your-secret-key-here-change-this'

# =========================
# INIT EXTENSIONS
# =========================
db.init_app(app)
mail.init_app(app)

# =========================
# IMPORT MODELS AFTER DB INIT
# =========================
from models.user import User
from models.announcement import Announcement
from models.service_request import ServiceRequest
from models.chat_message import ChatMessage
from models.notification import Notification

# =========================
# REGISTER ROUTES (BLUEPRINTS)
# =========================
from routes.auth_routes import auth_bp
from routes.announcement_routes import announcement_bp
from routes.request_routes import request_bp
from routes.chat_routes import chat_bp
from routes.notification_routes import notification_bp
from routes.user_routes import user_bp
from routes.help_routes import help_bp
from routes.admin_routes import admin_bp  # Add admin routes

# Register all blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(announcement_bp, url_prefix="/api/announcements")
app.register_blueprint(request_bp, url_prefix="/api/requests")
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(notification_bp, url_prefix="/api/notifications")
app.register_blueprint(user_bp, url_prefix="/api/users")
app.register_blueprint(help_bp, url_prefix="/api/help")
app.register_blueprint(admin_bp, url_prefix="/api/admin")  # Register admin routes

# =========================
# ROOT ROUTE
# =========================
@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "message": "Campus Connect API is running",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth/register, /api/auth/login",
            "announcements": "/api/announcements/",
            "requests": "/api/requests/",
            "chat": "/api/chat/messages",
            "notifications": "/api/notifications/",
            "users": "/api/users/",
            "help": "/api/help/faqs, /api/help/contact",
            "admin": "/api/admin/users, /api/admin/stats"
        }
    })

# =========================
# HEALTH CHECK ENDPOINT
# =========================
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    })

# =========================
# CREATE DATABASE TABLES
# =========================
with app.app_context():
    db.create_all()
    
    # Create test users if they don't exist
    from werkzeug.security import generate_password_hash
    
    # Create test student
    if not User.query.filter_by(email="test@example.com").first():
        test_user = User(
            name="Test Student",
            email="test@example.com",
            role="student",
            password=generate_password_hash("password123"),
            department="Computer Science",
            bio="I'm a test student user",
            phone="+1234567890"
        )
        db.session.add(test_user)
        print("✓ Test student user created")
    
    # Create test admin
    if not User.query.filter_by(email="admin@example.com").first():
        admin_user = User(
            name="Admin User",
            email="admin@example.com",
            role="admin",
            password=generate_password_hash("admin123"),
            department="Administration",
            bio="System Administrator",
            phone="+1234567890"
        )
        db.session.add(admin_user)
        print("✓ Test admin user created")
    
    # Create sample announcements if none exist
    if Announcement.query.count() == 0:
        sample_announcements = [
            Announcement(
                title="🎉 Welcome to Campus Connect!",
                message="We're excited to have you on board. This platform helps students collaborate, submit requests, and stay updated with campus announcements.",
                created_by=2  # admin user
            ),
            Announcement(
                title="💬 New Collaboration Feature Available",
                message="The Collaboration Hub is now live! You can now chat with other students in real-time and work together on projects.",
                created_by=2
            ),
            Announcement(
                title="📝 Service Request System Update",
                message="You can now track your service requests in real-time. Maximum 5 pending requests allowed at a time.",
                created_by=2
            )
        ]
        for announcement in sample_announcements:
            db.session.add(announcement)
        print("✓ Sample announcements created")
    
    # Create sample service requests
    if ServiceRequest.query.count() == 0:
        sample_requests = [
            ServiceRequest(
                title="Library Access Issue",
                description="I cannot access the online library resources. Need assistance with login credentials.",
                status="Pending",
                user_id=1
            ),
            ServiceRequest(
                title="Course Registration Help",
                description="Need help registering for CS301 course. The system shows it's full.",
                status="In Progress",
                user_id=1
            )
        ]
        for req in sample_requests:
            db.session.add(req)
        print("✓ Sample service requests created")
    
    db.session.commit()
    print("✓ Database initialized successfully")
    print(f"  - Users: {User.query.count()}")
    print(f"  - Announcements: {Announcement.query.count()}")
    print(f"  - Requests: {ServiceRequest.query.count()}")

# =========================
# ERROR HANDLERS
# =========================
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({"error": "Internal server error"}), 500

# =========================
# MAIN ENTRY POINT
# =========================
if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 Campus Connect Backend Server")
    print("="*60)
    print(f"📍 Server running on: http://127.0.0.1:5000")
    print(f"📋 API Documentation available at: http://127.0.0.1:5000/")
    print("\n📌 Available Endpoints:")
    print("   AUTHENTICATION:")
    print("   POST   /api/auth/register     - Register new user")
    print("   POST   /api/auth/login        - Login user")
    print("\n   ANNOUNCEMENTS:")
    print("   GET    /api/announcements/    - Get all announcements")
    print("   POST   /api/announcements/    - Create announcement (admin)")
    print("\n   REQUESTS:")
    print("   GET    /api/requests/         - Get all requests (admin)")
    print("   POST   /api/requests/         - Create new request")
    print("   GET    /api/requests/user/<id> - Get user's requests")
    print("   PUT    /api/requests/<id>     - Update request status")
    print("\n   CHAT:")
    print("   GET    /api/chat/messages     - Get chat messages")
    print("   POST   /api/chat/messages     - Send chat message")
    print("\n   NOTIFICATIONS:")
    print("   GET    /api/notifications/    - Get user notifications")
    print("   PUT    /api/notifications/<id>/read - Mark notification as read")
    print("\n   USER MANAGEMENT:")
    print("   GET    /api/users/<id>        - Get user profile")
    print("   PUT    /api/users/<id>        - Update user profile")
    print("   PUT    /api/users/<id>/change-password - Change password")
    print("\n   HELP & SUPPORT:")
    print("   GET    /api/help/faqs         - Get FAQs")
    print("   POST   /api/help/contact      - Contact support")
    print("\n   ADMIN:")
    print("   GET    /api/admin/users       - Get all users")
    print("   GET    /api/admin/stats       - Get platform statistics")
    print("   PUT    /api/admin/users/<id>  - Update user")
    print("   POST   /api/admin/users/<id>/block - Block user")
    print("\n✅ Server is ready to accept connections!")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')