from flask import jsonify
from pydantic import ValidationError
from werkzeug.exceptions import HTTPException
import logging

logger = logging.getLogger(__name__)

class APIException(Exception):
    """Base API Exception class for custom application errors"""
    status_code = 500
    message = "An unexpected error occurred"

    def __init__(self, message=None, status_code=None, payload=None):
        super().__init__()
        if message is not None:
            self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['success'] = False
        rv['error'] = self.message
        rv['detail'] = self.message
        return rv

class BadRequestException(APIException):
    status_code = 400
    message = "Bad Request"

class UnauthorizedException(APIException):
    status_code = 401
    message = "Unauthorized"

class ForbiddenException(APIException):
    status_code = 403
    message = "Forbidden"

class NotFoundException(APIException):
    status_code = 404
    message = "Not Found"

class ConflictException(APIException):
    status_code = 409
    message = "Conflict"

def register_error_handlers(app):
    """Register global error handlers on the Flask application"""

    @app.errorhandler(APIException)
    def handle_api_exception(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        errors_detail = []
        simplified_details = []
        for err in error.errors():
            # e.g., loc = ("email",) -> field = "email"
            field = ".".join(str(loc) for loc in err.get("loc", []))
            msg = err.get("msg", "invalid value")
            errors_detail.append(f"{field}: {msg}")
            simplified_details.append({
                "field": field,
                "message": msg,
                "type": err.get("type", "value_error")
            })
        
        detail_str = "; ".join(errors_detail)
        response_data = {
            "success": False,
            "error": "Validation failed",
            "detail": detail_str,
            "details": simplified_details
        }
        return jsonify(response_data), 400


    @app.errorhandler(ValueError)
    def handle_value_error(error):
        # Business rule violations raise ValueError
        msg = str(error)
        status_code = 400
        # If the value error is a duplicate email, map it to 409 Conflict
        if "already in use" in msg.lower() or "already exists" in msg.lower():
            status_code = 409
            
        response_data = {
            "success": False,
            "error": msg,
            "detail": msg
        }
        return jsonify(response_data), status_code

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        response_data = {
            "success": False,
            "error": error.name,
            "detail": error.description
        }
        return jsonify(response_data), error.code

    @app.errorhandler(Exception)
    def handle_generic_exception(error):
        # Log the full traceback on the server side
        app.logger.error(f"Unhandled Exception: {str(error)}", exc_info=True)
        response_data = {
            "success": False,
            "error": "Internal Server Error",
            "detail": "An unexpected server error occurred. Please try again later."
        }
        return jsonify(response_data), 500
