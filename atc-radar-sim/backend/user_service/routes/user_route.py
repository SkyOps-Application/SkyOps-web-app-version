from flask import Blueprint, request, jsonify, g, current_app
from pydantic import ValidationError

from models.model_dto import UserSchema, UserResponseSchema
from services.user_service import (
    create_user,
    get_user,
    get_all_users,
    get_user_history, # Kept this as it's used later
)
from services.auth_service import jwt_required
from services.redis_service import RedisService
import os

user_bp = Blueprint('user', __name__)

@user_bp.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        
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

    except ValidationError as e:
        current_app.logger.warning(f"Invalid registration data: {e.errors()}")
        # Parse Pydantic errors to list of dicts that are JSON serializable
        errors = []
        for error in e.errors():
            err_dict = {
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"]
            }
            errors.append(err_dict)
        return jsonify({"error": "Invalid registration data", "details": errors}), 400

    except ValueError as e:
        current_app.logger.warning(f"Registration error: {str(e)}")
        return jsonify({"error": "Registration failed", "details": str(e)}), 400

    except Exception as e:
        current_app.logger.error(f"Error registering user: {str(e)}")
        return jsonify({"error": "Error registering user", "details": str(e)}), 500

@user_bp.route("/me", methods=["GET"])
@jwt_required
def get_current_user():
    try:
        user_id = g.user_id
        from services.user_service import get_user
        user = get_user(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify(user.model_dump()), 200

    except Exception as e:
        current_app.logger.error(f"Error retrieving profile: {str(e)}")
        return jsonify({"error": "Error retrieving profile"}), 500
@user_bp.route("/history", methods=["GET"])
@jwt_required
def get_history():
    try:
        # Get user id from the JWT token
        user_id = g.user_id
        current_app.logger.debug(f"Retrieving history")
        
        # user's history
        history = get_user_history(user_id)
        if history is None:
             current_app.logger.warning(f"User not found")
             return jsonify({"error": "User not found"}), 404
            
        return jsonify(history), 200
        
    except Exception as e:
        current_app.logger.error(f"Error retrieving history: {str(e)}")
        return jsonify({"error": "Error retrieving history", "details": str(e)}), 500

    