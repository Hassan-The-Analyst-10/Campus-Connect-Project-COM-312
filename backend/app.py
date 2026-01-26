from flask import Flask
from flask_cors import CORS
from config import Config

from models import db, mail
from routes.auth_routes import auth_bp
from routes.announcement_routes import announcement_bp
from routes.request_routes import request_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    mail.init_app(app)
    CORS(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(announcement_bp, url_prefix="/api/announcements")
    app.register_blueprint(request_bp, url_prefix="/api/requests")

    @app.route("/")
    def home():
        return {"message": "CampusConnect Backend Running"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
