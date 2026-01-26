from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

db = SQLAlchemy()
mail = Mail()

from .user import User
from .announcement import Announcement
from .service_request import ServiceRequest
