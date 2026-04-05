from flask import Blueprint, jsonify, request
from models.user import User
from models.service_request import ServiceRequest
from models.announcement import Announcement
from models.chat_message import ChatMessage
from models.notification import Notification
from extensions import db
from werkzeug.security import generate_password_hash

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/users", methods=["GET"])
def get_users():
    """Get all users"""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@admin_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Get specific user"""
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@admin_bp.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    """Update user details"""
    user = User.query.get_or_404(user_id)
    data = request.json
    
    if "name" in data:
        user.name = data["name"]
    if "role" in data:
        user.role = data["role"]
    if "department" in data:
        user.department = data["department"]
    if "phone" in data:
        user.phone = data["phone"]
    if "bio" in data:
        user.bio = data["bio"]
    
    db.session.commit()
    return jsonify(user.to_dict())

@admin_bp.route("/users/<int:user_id>/reset-password", methods=["POST"])
def reset_password(user_id):
    """Reset user password"""
    user = User.query.get_or_404(user_id)
    data = request.json
    new_password = data.get("password", "password123")
    
    user.password = generate_password_hash(new_password)
    db.session.commit()
    
    return jsonify({"message": f"Password reset for {user.name}"})

@admin_bp.route("/users/<int:user_id>/block", methods=["POST"])
def block_user(user_id):
    """Block/unblock user"""
    user = User.query.get_or_404(user_id)
    data = request.json
    # Add is_blocked column if not exists, or use status
    user.role = "blocked" if data.get("blocked", True) else "student"
    db.session.commit()
    
    status = "blocked" if data.get("blocked", True) else "unblocked"
    return jsonify({"message": f"User {user.name} has been {status}"})

@admin_bp.route("/stats", methods=["GET"])
def get_stats():
    """Get platform statistics"""
    total_students = User.query.filter_by(role="student").count()
    total_admins = User.query.filter_by(role="admin").count()
    total_requests = ServiceRequest.query.count()
    pending_requests = ServiceRequest.query.filter_by(status="Pending").count()
    in_progress_requests = ServiceRequest.query.filter_by(status="In Progress").count()
    completed_requests = ServiceRequest.query.filter_by(status="Completed").count()
    total_announcements = Announcement.query.count()
    total_messages = ChatMessage.query.count()
    unread_notifications = Notification.query.filter_by(is_read=False).count()
    
    return jsonify({
        "total_students": total_students,
        "total_admins": total_admins,
        "total_users": total_students + total_admins,
        "total_requests": total_requests,
        "pending_requests": pending_requests,
        "in_progress_requests": in_progress_requests,
        "completed_requests": completed_requests,
        "total_announcements": total_announcements,
        "total_messages": total_messages,
        "unread_notifications": unread_notifications
    })

@admin_bp.route("/messages/unread-count", methods=["GET"])
def get_unread_messages():
    """Get unread messages count"""
    # This is a placeholder - implement actual message counting logic
    return jsonify({"count": 0})

@admin_bp.route("/requests/pending", methods=["GET"])
def get_pending_requests():
    """Get all pending requests"""
    requests = ServiceRequest.query.filter_by(status="Pending").order_by(ServiceRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "created_at": r.created_at.isoformat(),
            "user_name": r.user.name if r.user else "Unknown",
            "user_email": r.user.email if r.user else "Unknown"
        }
        for r in requests
    ])

@admin_bp.route("/announcements/<int:announcement_id>", methods=["DELETE"])
def delete_announcement(announcement_id):
    """Delete an announcement"""
    announcement = Announcement.query.get_or_404(announcement_id)
    db.session.delete(announcement)
    db.session.commit()
    return jsonify({"message": "Announcement deleted"})

@admin_bp.route("/announcements/<int:announcement_id>", methods=["PUT"])
def update_announcement(announcement_id):
    """Update an announcement"""
    announcement = Announcement.query.get_or_404(announcement_id)
    data = request.json
    
    if "title" in data:
        announcement.title = data["title"]
    if "message" in data:
        announcement.message = data["message"]
    
    db.session.commit()
    return jsonify({
        "id": announcement.id,
        "title": announcement.title,
        "message": announcement.message,
        "created_at": announcement.created_at.isoformat()
    })

@admin_bp.route("/dashboard/stats", methods=["GET"])
def get_dashboard_stats():
    """Get dashboard statistics"""
    total_students = User.query.filter_by(role="student").count()
    pending_requests = ServiceRequest.query.filter_by(status="Pending").count()
    total_announcements = Announcement.query.count()
    
    # Get recent activities
    recent_requests = ServiceRequest.query.order_by(ServiceRequest.created_at.desc()).limit(5).all()
    recent_activities = []
    
    for req in recent_requests:
        recent_activities.append({
            "id": req.id,
            "type": "request",
            "title": req.title,
            "status": req.status,
            "user": req.user.name if req.user else "Unknown",
            "time": req.created_at.isoformat()
        })
    
    return jsonify({
        "stats": {
            "totalStudents": total_students,
            "pendingRequests": pending_requests,
            "totalAnnouncements": total_announcements,
            "unreadMessages": 0
        },
        "recentActivities": recent_activities
    })