from pydantic import BaseModel, EmailStr, Field
from beanie import PydanticObjectId
from typing import Optional
from uuid import UUID


class UserAuth(BaseModel):
    name: str = Field(..., min_length=5, max_length=50, description='user name')
    email: EmailStr = Field(..., description='user email')
    password: str = Field(..., min_length=5, max_length=24, description='user password')
    image_url: str
    role_id: PydanticObjectId

class UserOut(BaseModel):
    user_id: UUID
    name: str
    email: EmailStr
    image_url: str
    team_name: Optional[str]
    team_member: Optional[list]
    role_id: PydanticObjectId

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    image_url: Optional[str]
    role_id: PydanticObjectId