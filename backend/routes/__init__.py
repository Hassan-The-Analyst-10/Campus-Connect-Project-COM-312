from .auth_routes import auth_bp
from .announcement_routes import announcement_bp
from .request_routes import request_bp
from .admin_routes import admin_bp
from .chat_routes import chat_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(announcement_bp, url_prefix="/api/announcements")
    app.register_blueprint(request_bp, url_prefix="/api/requests")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(chat_bp, url_prefix="/api/chat")