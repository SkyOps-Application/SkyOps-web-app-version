from ..models.model_dto import UserSchema, UserResponseSchema
from ..models.model_db import UserModel
from ..database import db_session
from typing import List, Optional
import random
import string
import hashlib
import logging

logger = logging.getLogger(__name__)

def generate_random_password(length=10):
    """Generate a random password of specified length"""
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(chars) for _ in range(length))

def hash_password(password):
    """Hash a password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(user: UserSchema) -> UserResponseSchema:
    """
    Create a new user with a random password and persist it to the database
    """
    # Generate a random password
    random_password = generate_random_password()
    hashed_password = hash_password(random_password)
    
    db_user = UserModel(
        email=user.email,
        last_name=user.last_name,
        first_name=user.first_name,
        password_hash=hashed_password
    )
    
    # Add and commit to database
    db = db_session()
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
