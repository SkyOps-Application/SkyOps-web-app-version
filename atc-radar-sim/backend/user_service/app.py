import os
from flask import Flask
from extensions import db
from flask_migrate import Migrate
from models.model_db import User, History # Ensure models are imported
from routes.auth_route import auth_bp
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/skyops_user_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

    # Initialize Extensions
    db.init_app(app)
    Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(auth_bp)

    @app.route('/health')
    def health():
        return {'status': 'healthy', 'service': 'user_service'}

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=8000)
