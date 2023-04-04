from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    name: str = Field(..., min_length=10, max_length=50, description='user name')
    email: EmailStr = Field(..., description='user email')
    password: str = Field(..., min_length=5, max_length=24, description='user password')