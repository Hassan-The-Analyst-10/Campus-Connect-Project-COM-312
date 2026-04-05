from flask import Blueprint, request, jsonify
from extensions import db, mail
from flask_mail import Message
from datetime import datetime

help_bp = Blueprint("help", __name__)

# FAQ data
FAQS = [
    {"id": 1, "question": "How do I submit a service request?", "answer": "Go to Requests page, click 'New Service Request', fill in the details and submit."},
    {"id": 2, "question": "How can I collaborate with other students?", "answer": "Use the Collaboration Hub to chat with other students in real-time."},
    {"id": 3, "question": "What happens if I have too many pending requests?", "answer": "You can have maximum 5 pending requests. After that, you'll be blocked until admin responds."},
    {"id": 4, "question": "How do I reset my password?", "answer": "Go to Settings > Security, enter your current password and new password."},
    {"id": 5, "question": "How can I contact support?", "answer": "Use the contact form below or email us at support@campusconnect.com"},
]

@help_bp.route("/faqs", methods=["GET"])
def get_faqs():
    return jsonify(FAQS)

@help_bp.route("/contact", methods=["POST"])
def contact_support():
    data = request.json
    
    # Send email to support
    msg = Message(
        subject=f"Support Request from {data['name']}",
        recipients=["support@campusconnect.com"],
        body=f"""
        Name: {data['name']}
        Email: {data['email']}
        Subject: {data['subject']}
        
        Message:
        {data['message']}
        """
    )
    mail.send(msg)
    
    # Send confirmation to user
    confirm_msg = Message(
        subject="We received your support request",
        recipients=[data['email']],
        body=f"Dear {data['name']},\n\nThank you for contacting us. We have received your request and will respond within 24 hours.\n\nBest regards,\nCampus Connect Support Team"
    )
    mail.send(confirm_msg)
    
    return jsonify({"message": "Message sent successfully"}), 200