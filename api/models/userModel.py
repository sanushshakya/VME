from uuid import UUID, uuid4
from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field, EmailStr
from typing import Optional,List
from pymongo import IndexModel, ASCENDING
import datetime

class User(Document):
    user_id: UUID = Field(default_factory=uuid4)
    name: str
    email: Indexed(EmailStr, unique = True)
    hashed_password: str
    team_name: Optional[str]
    team_member: Optional[List[str]]
    role_name: str
    image_url: Optional[str]

    def __repr__(self) -> str:
        return f"<user {self.email}>"
    
    def __str__(self) -> str:
        return self.email
    
    def __hash__(self) -> str:
        return hash (self.email)
    
    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False

    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    @classmethod
    async def by_email(self, email:str) -> "User":
        return await self.find_one(self.email == email)
    
    class collection:
        name = "users"
        indexes = [IndexModel([("role_name", ASCENDING)])]