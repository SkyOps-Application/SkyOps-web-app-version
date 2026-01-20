from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import List, Optional, Union
from datetime import datetime

class UserSchema(BaseModel):
    email: str
    age: Optional[int] = Field(None, ge=0)
    first_name: str
    last_name: str
    password: str
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) <= 8:
            raise ValueError(f'Password must be longer than 8 characters (received {len(v)})')
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one number')
        if not any(char.isalpha() for char in v):
            raise ValueError('Password must contain at least one letter')
        return v

class TokenSchema(BaseModel):
    access_token: str
    token_type: str

class UserResponseSchema(BaseModel):
    email: str
    age: Optional[int] = None
    first_name: str
    last_name: str

class LoginSchema(BaseModel):
    email: str
    password: str

class UserHistorySchema(BaseModel):
    email: str
    history: List[dict] = []

class ForgotPasswordSchema(BaseModel):
    email: str

class ResetPasswordSchema(BaseModel):
    email: str
    first_name: str
    last_name: str
    new_password: str

    @field_validator('new_password')
    @classmethod
    def validate_password(cls, v):
        if len(v) <= 8:
            raise ValueError(f'Password must be longer than 8 characters (received {len(v)})')
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one number')
        if not any(char.isalpha() for char in v):
            raise ValueError('Password must contain at least one letter')
        return v
    