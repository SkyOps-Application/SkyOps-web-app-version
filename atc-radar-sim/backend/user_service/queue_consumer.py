import logging
import threading
import time
from flask import Flask
from services.redis_service import RedisService
from database import db_session
from models.model_db import UserHistoryModel, UserModel
from datetime import datetime

logger = logging.getLogger(__name__)

def process_history_log(data):
    """

    Process a single history log entry and save to DB
    """
    logger.info(f"Processing history log: {data}")
    
    # Extract data
    # Note: Simulator sends userId 'current-user' for now, we might need to map it or ignore if invalid
    # For proof of concept, we will try to find a default user or just log if missing
    # In real app, user_id should be real UUID.
    
    user_id = data.get('userId')
    
    db = db_session()
    try:
        user = None
        if user_id == 'current-user':
             # Fallback for testing: pick first user
             user = db.query(UserModel).first()
             if user:
                 user_id = user.id
        else:
            user = db.query(UserModel).filter(UserModel.id == user_id).first()
            
        if not user:
            logger.warning(f"User not found for history log: {user_id}")
            return

        # Create history record
        history_entry = UserHistoryModel(
            user_id=user_id,
            timestamp=datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00')),
            duration=data.get('duration', 0),
            violations=data.get('violations', 0),
            traffic_count=data.get('traffic_count', 0),
            score=data.get('score', 0)
        )
        
        db.add(history_entry)
        db.commit()
        logger.info(f"Saved history for user {user.email}")
        
    except Exception as e:
        logger.error(f"Failed to save history log: {e}")
        db.rollback()
    finally:
        db.close()

def start_consumer(app: Flask):
    """
    Start the Redis consumer in a background thread
    """
    def run():
        logger.info("Starting Redis consumer thread...")
        redis_service = RedisService()
        
        # Give context to thread if needed, though we use db_session which is thread-local
        with app.app_context():
            while True:
                try:
                    data = redis_service.consume_history_logs(timeout=5)
                    if data:
                        process_history_log(data)
                except Exception as e:
                    logger.error(f"Consumer loop error: {e}")
                    time.sleep(5) # Prevent tight loop on error

    thread = threading.Thread(target=run, daemon=True)
    thread.start()
