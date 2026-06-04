from flask import Blueprint, request, jsonify, g, current_app
from pydantic import ValidationError

from models.model_dto import UserSchema, UserResponseSchema
from services.user_service import (
    create_user,
    get_user,
    get_user_history,
)
from services.auth_service import jwt_required
from services.redis_service import RedisService
import os

from utils.errors import NotFoundException

user_bp = Blueprint('user', __name__)

@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    
    register_schema = UserSchema(**data)
    new_user = create_user(register_schema)
    
    current_app.logger.info(f"Registered new user: {register_schema.email}")
    
    # Welcome Email via Redis Queue hehe
    redis_service = RedisService()
    email_task = {
        "type": "WELCOME",
        "email": register_schema.email,
        "first_name": register_schema.first_name
    }
    redis_service.add_to_queue("notification_queue", email_task)
    
    return jsonify(new_user.model_dump()), 201

@user_bp.route("/me", methods=["GET"])
@jwt_required
def get_current_user():
    user_id = g.user_id
    from services.user_service import get_user
    user = get_user(user_id)
    
    if not user:
        raise NotFoundException("User not found")
        
    return jsonify(user.model_dump()), 200

@user_bp.route("/history", methods=["GET"])
@jwt_required
def get_history():
    # Get user id from the JWT token
    user_id = g.user_id
    current_app.logger.debug(f"Retrieving history")
    
    # user's history
    history = get_user_history(user_id)
    if history is None:
         current_app.logger.warning(f"User not found")
         raise NotFoundException("User not found")
        
    return jsonify(history), 200


    