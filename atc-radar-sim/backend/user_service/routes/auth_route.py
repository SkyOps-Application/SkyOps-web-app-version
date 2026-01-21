
from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from models.model_dto import LoginSchema, TokenSchema, ForgotPasswordSchema, ResetPasswordSchema
from services.auth_service import authenticate_user, create_access_token
from services.user_service import get_user_by_email, update_password
from services.redis_service import RedisService

from datetime import datetime, timezone

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/oauth/token", methods=["POST"])
def login():
    try:
        content_type = request.headers.get('Content-Type', '')
        if 'application/x-www-form-urlencoded' in content_type:
            login_data = {
                "email": request.form.get("username"),  # OAuth uses 'username' 
                "password": request.form.get("password")
            }
        else: 
            login_data = request.get_json()
            
        login_schema = LoginSchema.model_validate(login_data)
        
        user = authenticate_user(login_schema.email, login_schema.password)
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Create access token with standard OAuth claims
        token_data = {
            "sub": user.id,
            "name": user.last_name,
            "iss": "skyops-api", 
            "iat": datetime.now(timezone.utc), 
        }
        
        access_token = create_access_token(
            data=token_data, 
        )
        
        token = TokenSchema(
            access_token=access_token,
            token_type="bearer"
        )
        
        response_data = token.model_dump()
        
        return jsonify(response_data), 200
        
    except ValidationError as e:
        return jsonify({"error": "Invalid login data", "details": e.errors()}), 400
    except Exception as e:
        import traceback
        print(f"Login failed: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Error logging in", "details": str(e)}), 500

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    try:
        data = request.get_json()
        schema = ForgotPasswordSchema(**data)
        
        user = get_user_by_email(schema.email)
        if not user:
            return jsonify({"message": "If this email is registered, a password reset link has been sent."}), 200

        redis_service = RedisService()
        email_task = {
            "type": "PASSWORD_RESET",
            "email": user.email,
            "first_name": user.first_name
        }
        redis_service.add_to_queue("notification_queue", email_task)
        
        return jsonify({"message": "If this email is registered, a password reset link has been sent."}), 200
        
    except ValidationError as e:
        return jsonify({"error": "Invalid data", "details": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": "Error processing request", "details": str(e)}), 500

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        schema = ResetPasswordSchema(**data)
        
        user = get_user_by_email(schema.email)
        if not user:
            return jsonify({"error": "User not found"}), 404
             
        if (user.first_name.strip().lower() != schema.first_name.strip().lower() or 
            user.last_name.strip().lower() != schema.last_name.strip().lower()):
            return jsonify({"error": "Identity verification failed. Name does not match records."}), 403
            
        update_password(user.id, schema.new_password)
        
        return jsonify({"message": "Password updated successfully"}), 200

    except ValidationError as e:
        return jsonify({"error": "Invalid data", "details": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": "Error resetting password", "details": str(e)}), 500
