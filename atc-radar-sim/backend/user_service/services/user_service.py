from ..models.model_dto import UserSchema, UserResponseSchema
from ..models.model_db import UserModel
from ..database import db_session
from typing import List, Optional, Union

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

    db = db_session()
    try:
        # Check if user with email already exists
        existing_user = db.query(UserModel).filter(UserModel.email == user.email).first()
        if existing_user:
            raise ValueError("Email already in use")
            
        hashed_password = hash_password(user.password)
        
        db_user = UserModel(
            email=user.email,
            age=user.age,
            last_name=user.last_name,
            first_name=user.first_name,
            password_hash=hashed_password
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return UserResponseSchema(
            email=db_user.email,
            first_name=db_user.first_name,
            last_name=db_user.last_name,
            age=db_user.age
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
                "id": record.id,
                "timestamp": record.timestamp.isoformat() if record.timestamp else None,
                "duration_seconds": record.duration,
                "violations_count": record.violations,
                "traffic_count": record.traffic_count,
                "score": max(0, 100 - (record.violations * 10)) # content score
            })
        return history
    finally:
        db.close()

def get_user_by_email(email: str) -> Optional[UserModel]:
    """Retrieve user model by email (internal use)"""
    db = db_session()
    try:
        return db.query(UserModel).filter(UserModel.email == email).first()
    finally:
        db.close()

def update_password(user_id: str, new_password: str):
    """Update user's password"""
    db = db_session()
    try:
        user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not user:
            raise ValueError("User not found")
            
        user.password_hash = hash_password(new_password)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
