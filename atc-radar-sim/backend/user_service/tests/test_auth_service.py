"""
Unit tests for auth_service module
"""
import pytest
from unittest.mock import MagicMock, patch
import datetime
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set environment variable for tests
os.environ['SECRET_KEY'] = 'test-secret-key-for-testing'


class TestCreateAccessToken:
    """Tests for create_access_token function"""

    def test_create_access_token_returns_string(self):
        """create_access_token should return a JWT string"""
        from services.auth_service import create_access_token
        
        token = create_access_token({'sub': 'user123'})
        
        assert isinstance(token, str)
        assert len(token) > 0

    def test_create_access_token_with_custom_expiry(self):
        """create_access_token should accept custom expiry"""
        from services.auth_service import create_access_token
        
        expires = datetime.timedelta(minutes=30)
        token = create_access_token({'sub': 'user123'}, expires_delta=expires)
        
        assert isinstance(token, str)

    def test_create_access_token_encodes_data(self):
        """create_access_token should encode the provided data"""
        from services.auth_service import create_access_token, decode_token
        
        data = {'sub': 'user123', 'custom': 'value'}
        token = create_access_token(data)
        decoded = decode_token(token)
        
        assert decoded.get('sub') == 'user123'
        assert decoded.get('custom') == 'value'


class TestDecodeToken:
    """Tests for decode_token function"""

    def test_decode_token_valid(self):
        """decode_token should correctly decode a valid token"""
        from services.auth_service import create_access_token, decode_token
        
        token = create_access_token({'sub': 'user123'})
        decoded = decode_token(token)
        
        assert decoded.get('sub') == 'user123'
        assert 'error' not in decoded

    def test_decode_token_invalid(self):
        """decode_token should return error for invalid token"""
        from services.auth_service import decode_token
        
        decoded = decode_token('invalid.token.here')
        
        assert 'error' in decoded

    def test_decode_token_expired(self):
        """decode_token should return error for expired token"""
        from services.auth_service import create_access_token, decode_token
        
        # Create a token that expires immediately
        expires = datetime.timedelta(seconds=-1)
        token = create_access_token({'sub': 'user123'}, expires_delta=expires)
        decoded = decode_token(token)
        
        assert 'error' in decoded
        assert decoded['error'] == 'Token expired'


class TestAuthenticateUser:
    """Tests for authenticate_user function"""

    @patch('services.auth_service.db_session')
    def test_authenticate_user_not_found(self, mock_db):
        """authenticate_user should return None for non-existent user"""
        from services.auth_service import authenticate_user

        mock_session = MagicMock()
        mock_db.return_value = mock_session
        mock_session.query.return_value.filter.return_value.first.return_value = None

        result = authenticate_user('nonexistent@example.com', 'password')
        
        assert result is None

    @patch('services.auth_service.db_session')
    @patch('services.auth_service.hash_password')
    def test_authenticate_user_wrong_password(self, mock_hash, mock_db):
        """authenticate_user should return None for wrong password"""
        from services.auth_service import authenticate_user

        mock_session = MagicMock()
        mock_db.return_value = mock_session

        mock_user = MagicMock()
        mock_user.password_hash = 'correct_hash'
        mock_session.query.return_value.filter.return_value.first.return_value = mock_user

        mock_hash.return_value = 'wrong_hash'

        result = authenticate_user('test@example.com', 'wrongpassword')
        
        assert result is None

    @patch('services.auth_service.db_session')
    @patch('services.auth_service.hash_password')
    def test_authenticate_user_success(self, mock_hash, mock_db):
        """authenticate_user should return user for correct credentials"""
        from services.auth_service import authenticate_user

        mock_session = MagicMock()
        mock_db.return_value = mock_session

        mock_user = MagicMock()
        mock_user.email = 'test@example.com'
        mock_user.password_hash = 'correct_hash'
        mock_session.query.return_value.filter.return_value.first.return_value = mock_user

        mock_hash.return_value = 'correct_hash'

        result = authenticate_user('test@example.com', 'correctpassword')
        
        assert result is not None
        assert result.email == 'test@example.com'


class TestJwtRequired:
    """Tests for jwt_required decorator"""

    def test_jwt_required_decorator_exists(self):
        """jwt_required decorator should exist and be callable"""
        from services.auth_service import jwt_required
        
        assert callable(jwt_required)

    def test_jwt_required_preserves_function_name(self):
        """jwt_required should preserve the original function name"""
        from services.auth_service import jwt_required
        
        @jwt_required
        def test_function():
            pass
        
        assert test_function.__name__ == 'test_function'


class TestApiKeyRequired:
    """Tests for api_key_required decorator"""

    def test_api_key_required_decorator_exists(self):
        """api_key_required decorator should exist and be callable"""
        from services.auth_service import api_key_required
        
        assert callable(api_key_required)

    def test_api_key_required_preserves_function_name(self):
        """api_key_required should preserve the original function name"""
        from services.auth_service import api_key_required
        
        @api_key_required
        def test_function():
            pass
        
        assert test_function.__name__ == 'test_function'
