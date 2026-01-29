"""
Pytest fixtures for user_service tests
"""
import pytest
from unittest.mock import MagicMock, patch
import os
import sys

# Set test environment variables BEFORE any imports
os.environ['SECRET_KEY'] = 'test-secret-key-for-testing'
os.environ['FIT_API_KEY'] = 'test-api-key'
os.environ['DATABASE_URL'] = 'sqlite:///:memory:'

# Mock the database module before importing services
mock_engine = MagicMock()
mock_session = MagicMock()
mock_db_session = MagicMock(return_value=mock_session)

# Patch the database module
sys.modules['database'] = MagicMock()
sys.modules['database'].db_session = mock_db_session
sys.modules['database'].engine = mock_engine
sys.modules['database'].Base = MagicMock()


@pytest.fixture
def mock_db_session():
    """Mock database session"""
    with patch('services.user_service.db_session') as mock:
        mock_session = MagicMock()
        mock.return_value = mock_session
        yield mock_session


@pytest.fixture
def mock_auth_db_session():
    """Mock database session for auth service"""
    with patch('services.auth_service.db_session') as mock:
        mock_session = MagicMock()
        mock.return_value = mock_session
        yield mock_session


@pytest.fixture
def sample_user_data():
    """Sample user data for testing"""
    return {
        'email': 'test@example.com',
        'first_name': 'Test',
        'last_name': 'User',
        'age': 25,
        'password': 'SecurePassword123!'
    }


@pytest.fixture
def mock_user_model():
    """Mock UserModel instance"""
    user = MagicMock()
    user.id = '123'
    user.email = 'test@example.com'
    user.first_name = 'Test'
    user.last_name = 'User'
    user.age = 25
    user.password_hash = 'hashed_password'
    user.history = []
    return user
