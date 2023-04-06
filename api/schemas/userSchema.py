from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID


class UserAuth(BaseModel):
    name: str = Field(..., min_length=5, max_length=50, description='user name')
    email: EmailStr = Field(..., description='user email')
    password: str = Field(..., min_length=5, max_length=24, description='user password')

class UserOut(BaseModel):
    user_id: UUID
    name: str
    email: EmailStr

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None