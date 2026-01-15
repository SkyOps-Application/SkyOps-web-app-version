from ..models.model_dto import UserSchema, UserResponseSchema
from ..models.model_db import UserModel
from ..database import db_session
from typing import List, Optional, Union
import random
import string
import hashlib
import logging

logger = logging.getLogger(__name__)

def hash_password(password):
    """Hash a password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(user: UserSchema) -> UserResponseSchema:
    """
    Create a new user with user-provided password and persist it to the database
    """
    if not user.password:
        raise ValueError("Password is required")

    hashed_password = hash_password(user.password)
    
    db_user = UserModel(
        email=user.email,
        age=user.age,
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
        return UserResponseSchema(
            email=db_user.email
        )
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def update_user(id: str, update_user: UserSchema) -> Optional[UserResponseSchema]:
    """
    Update user
    """
    db = db_session()
    try:
        # Find the user
        user = db.query(UserModel).filter(UserModel.id == id).first()
        if not user:
            return None

        user.age = update_user.age
        user.first_name = update_user.first_name
        user.last_name = update_user.last_name
        
        db.commit()
        db.refresh(user)
        
        # Return the updated user
        return UserResponseSchema(
            email=user.email,
        )
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_user(id: str) -> Optional[UserResponseSchema]:
    """
    Retrieve user by ID
    """
    db = db_session()
    try:
        user = db.query(UserModel).filter(UserModel.id == id).first()
        if user:
            return UserResponseSchema(
                email=user.email,
            )
        return None
    finally:
        db.close()

def get_user_history(id: str) -> List:
    """
    Retrieve user history by user ID
    """
    db = db_session()
    try:
        user = db.query(UserModel).filter(UserModel.id == id).first()
        if not user:
            return []
        
        history = []
        for record in user.history:
            history.append({
                "timestamp": record.timestamp,
                "duration": record.duration,
                "violations": record.violations,
                "traffic_count": record.traffic_count
            })
        return history
    finally:
        db.close()
