"""
Unit tests for user_service module
"""
import pytest
from unittest.mock import MagicMock, patch
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestHashPassword:
    """Tests for hash_password function"""

    def test_hash_password_returns_string(self):
        """hash_password should return a string"""
        from services.user_service import hash_password
        result = hash_password('testpassword')
        assert isinstance(result, str)

    def test_hash_password_consistent(self):
        """Same input should produce same hash"""
        from services.user_service import hash_password
        hash1 = hash_password('testpassword')
        hash2 = hash_password('testpassword')
        assert hash1 == hash2

    def test_hash_password_different_inputs(self):
        """Different inputs should produce different hashes"""
        from services.user_service import hash_password
        hash1 = hash_password('password1')
        hash2 = hash_password('password2')
        assert hash1 != hash2

    def test_hash_password_length(self):
        """SHA-256 hash should be 64 characters"""
        from services.user_service import hash_password
        result = hash_password('anypassword')
        assert len(result) == 64


class TestCreateUser:
    """Tests for create_user function"""

    @patch('services.user_service.db_session')
    def test_create_user_checks_existing_email(self, mock_db):
        """create_user should raise error for existing email"""
        from services.user_service import create_user
        from models.model_dto import UserSchema

        mock_session = MagicMock()
        mock_db.return_value = mock_session
        mock_session.query.return_value.filter.return_value.first.return_value = MagicMock()

        user = UserSchema(
            email='existing@example.com',
            first_name='Test',
            last_name='User',
            age=25,
            password='password123'
        )

        with pytest.raises(ValueError, match="Email already in use"):
            create_user(user)


class TestGetUser:
    """Tests for get_user function"""

    @patch('services.user_service.db_session')
    def test_get_user_not_found(self, mock_db):
        """get_user should return None for non-existent user"""
        from services.user_service import get_user

        mock_session = MagicMock()
        mock_db.return_value = mock_session
        mock_session.query.return_value.filter.return_value.first.return_value = None

        result = get_user('nonexistent-id')
        assert result is None

    @patch('services.user_service.db_session')
    def test_get_user_returns_user_response(self, mock_db):
        """get_user should return UserResponseSchema for existing user"""
        from services.user_service import get_user
        from models.model_dto import UserResponseSchema

        mock_session = MagicMock()
        mock_db.return_value = mock_session

        mock_user = MagicMock()
        mock_user.email = 'test@example.com'
        mock_user.first_name = 'Test'
        mock_user.last_name = 'User'
        mock_user.age = 25
        mock_session.query.return_value.filter.return_value.first.return_value = mock_user

        result = get_user('valid-id')
        
        assert result is not None
        assert result.email == 'test@example.com'
        assert result.first_name == 'Test'


class TestGetUserByEmail:
    """Tests for get_user_by_email function"""

    @patch('services.user_service.db_session')
    def test_get_user_by_email_not_found(self, mock_db):
        """get_user_by_email should return None for non-existent email"""
        from services.user_service import get_user_by_email

        mock_session = MagicMock()
        mock_db.return_value = mock_session
        mock_session.query.return_value.filter.return_value.first.return_value = None

        result = get_user_by_email('nonexistent@example.com')
        assert result is None

    @patch('services.user_service.db_session')
    def test_get_user_by_email_returns_user(self, mock_db):
        """get_user_by_email should return UserModel for existing email"""
        from services.user_service import get_user_by_email

        mock_session = MagicMock()
        mock_db.return_value = mock_session

        mock_user = MagicMock()
        mock_user.email = 'test@example.com'
        mock_session.query.return_value.filter.return_value.first.return_value = mock_user

        result = get_user_by_email('test@example.com')
        
        assert result is not None
        assert result.email == 'test@example.com'


class TestGetUserHistory:
    """Tests for get_user_history function"""

    @patch('services.user_service.db_session')
    def test_get_user_history_user_not_found(self, mock_db):
        """get_user_history should return empty list for non-existent user"""
        from services.user_service import get_user_history

        mock_session = MagicMock()
        mock_db.return_value = mock_session
        mock_session.query.return_value.filter.return_value.first.return_value = None

        result = get_user_history('nonexistent-id')
        assert result == []

    @patch('services.user_service.db_session')
    def test_get_user_history_empty(self, mock_db):
        """get_user_history should return empty list when user has no history"""
        from services.user_service import get_user_history

        mock_session = MagicMock()
        mock_db.return_value = mock_session

        mock_user = MagicMock()
        mock_user.history = []
        mock_session.query.return_value.filter.return_value.first.return_value = mock_user

        result = get_user_history('valid-id')
        assert result == []
