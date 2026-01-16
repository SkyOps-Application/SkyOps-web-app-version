import logging
from flask import Flask

from .queue_consumer import start_consumer
from .database import init_db
from .routes import user_bp, auth_bp
import os
import sys
sys.stdout.reconfigure(line_buffering=True)

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Flask app
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)


# Register blueprints
app.register_blueprint(user_bp, url_prefix='/')
app.register_blueprint(auth_bp, url_prefix='/')


@app.route("/health")
def health():
    return {"status": "UP"}


def run_app():
    """Entry point for the application script"""
    # Initialize the database before
    init_db()

    # Start the Redis consumer
    # Only start in the main process (not reloader) to avoid double workers
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true" or not app.debug:
        start_consumer(app)

    app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == "__main__":
    run_app()