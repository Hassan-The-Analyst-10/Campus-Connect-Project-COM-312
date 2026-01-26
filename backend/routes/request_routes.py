from flask import Blueprint, request, jsonify
from flask_mail import Message
from models import db, mail
from models.service_request import ServiceRequest
from models.user import User

request_bp = Blueprint("requests", __name__)

# CREATE REQUEST (USER)
@request_bp.route("/", methods=["POST"])
def create_request():
    data = request.json

    service_request = ServiceRequest(
        title=data["title"],
        description=data["description"],
        user_id=data["user_id"]
    )

    db.session.add(service_request)
    db.session.commit()

    user = User.query.get(data["user_id"])

    msg = Message(
        subject="Service Request Received",
        recipients=[user.email],
        body="Your service request has been received and is under review."
    )
    mail.send(msg)

    return jsonify({"message": "Request submitted"}), 201


# GET ALL REQUESTS (ADMIN)
@request_bp.route("/", methods=["GET"])
def get_requests():
    requests = ServiceRequest.query.all()
    return jsonify([
        {
            "id": r.id,
            "title": r.title,
            "description": r.description,
            "status": r.status,
            "user": r.user.name
        }
        for r in requests
    ])


# UPDATE REQUEST STATUS (ADMIN)
@request_bp.route("/<int:request_id>", methods=["PUT"])
def update_request_status(request_id):
    data = request.json
    service_request = ServiceRequest.query.get_or_404(request_id)

    service_request.status = data["status"]
    db.session.commit()

    return jsonify({"message": "Request status updated"})
