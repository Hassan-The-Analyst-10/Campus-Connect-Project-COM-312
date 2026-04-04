from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

from extensions import db, mail

# 👇 CREATE APP
app = Flask(__name__)
CORS(app)

# =========================
# CONFIG
# =========================
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///campus_connect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your_password'

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

# =========================
# REGISTER ROUTES
# =========================
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/api/auth")

# =========================
# EXAMPLE ROUTES
# =========================
@app.route("/api/announcements/", methods=["GET"])
def get_announcements():
    announcements = Announcement.query.order_by(Announcement.created_at.desc()).all()
    return jsonify([
        {
            "id": a.id,
            "title": a.title,
            "message": a.message,
            "created_at": a.created_at.isoformat() if a.created_at else None
        } for a in announcements
    ])

# =========================
# CREATE DB
# =========================
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=5000)