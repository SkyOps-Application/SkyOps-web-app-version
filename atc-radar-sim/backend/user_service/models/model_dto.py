from pydantic import BaseModel, Field # type: ignore
from typing import List, Optional, Union
from datetime import datetime

class UserSchema(BaseModel):
    email: str
    age: Optional[int] = Field(None, ge=0)
    first_name: str
    last_name: str
    password: str

class TokenSchema(BaseModel):
    access_token: str
    token_type: str

class UserResponseSchema(UserSchema):
    email: str
    age: Optional[int] = None
    first_name: str
    last_name: str

class LoginSchema(BaseModel):
    email: str
    password: str

class UserHistorySchema(BaseModel):
    email: str

class RegisterSchema(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

    