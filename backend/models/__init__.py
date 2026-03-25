from extensions import db

# Import models so they register
from .user import User
from .announcement import Announcement
from .service_request import ServiceRequest
from .chat_message import ChatMessage