import logging
from flask import Flask


from .database import init_db
from .routes import user_bp, auth_bp
import os

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Create Flask app
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)

# Force stdout to be unbuffered
import sys
sys.stdout.reconfigure(line_buffering=True)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/')
app.register_blueprint(auth_bp, url_prefix='/')


@app.route("/health")
def health():
    return {"status": "UP"}

def run_app():
    """Entry point for the application script"""
    # Initialize the database before starting the app
    init_db()

    app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == "__main__":
    run_app()