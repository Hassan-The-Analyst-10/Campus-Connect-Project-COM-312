# routes/request_routes.py - Updated with user-specific endpoints
from flask import Blueprint, request, jsonify
from flask_mail import Message
from extensions import db, mail
from models.service_request import ServiceRequest
from models.user import User

request_bp = Blueprint("requests", __name__)

@request_bp.route("/", methods=["POST"])
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
    
    user = User.query.get(user_id)
    if user and user.email:
        msg = Message(
            subject="Service Request Received",
            recipients=[user.email],
            body=f"Your request '{data['title']}' has been received and is under review."
        )
        mail.send(msg)
    
    return jsonify({"message": "Request submitted"}), 201

@request_bp.route("/", methods=["GET"])
def get_requests():
    requests = ServiceRequest.query.order_by(ServiceRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "created_at": r.created_at.isoformat(),
            "user_name": r.user.name if r.user else "Unknown"
        }
        for r in requests
    ])

@request_bp.route("/user/<int:user_id>", methods=["GET"])
def get_user_requests(user_id):
    requests = ServiceRequest.query.filter_by(user_id=user_id).order_by(ServiceRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "created_at": r.created_at.isoformat()
        }
        for r in requests
    ])

@request_bp.route("/<int:request_id>", methods=["PUT"])
def update_request_status(request_id):
    data = request.json
    service_request = ServiceRequest.query.get_or_404(request_id)
    service_request.status = data["status"]
    db.session.commit()
    
    # Notify user about status change
    user = User.query.get(service_request.user_id)
    if user and user.email:
        msg = Message(
            subject=f"Request Status Update: {service_request.title}",
            recipients=[user.email],
            body=f"Your request '{service_request.title}' status has been updated to: {data['status']}"
        )
        mail.send(msg)
    
    return jsonify({"message": "Request status updated"})