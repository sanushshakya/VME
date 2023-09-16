from api.schemas.userSchema import UserAuth, UserUpdate
from api.models.userModel import User
from api.core.security import getPassword, verifyPassword
from typing import Optional, List
from uuid import UUID
from api.models.roleModel import Role
from fastapi import HTTPException
from beanie import PydanticObjectId
from pydantic import EmailStr

from bson import ObjectId

class UserService:
    @staticmethod
    async def readUser():
        return await User.find_all().to_list()
    
    @staticmethod
    async def readUserByEmail(email:str):
        return await User.find_one(email == User.email)
    
    @staticmethod
    async def get_users_by_role(role_name: str):
        role_doc = await Role.find_one({"name": role_name})
        if not role_doc:
            raise HTTPException(status_code=404, detail="Role not found")
        users = await User.find({"role_id": role_doc.id}).to_list()
        return users
    
    @staticmethod
    async def get_users_by_name(name: str):
        user = await User.find_one(name == User.name)
        return user
    
    @staticmethod
    async def get_users_by_id(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id )
        return user
    
    @staticmethod
    async def authenticate(email:str, password:str) -> Optional[User]:
        user = await UserService.readUserByEmail(email=email)
        if not user:
            return None
        if not verifyPassword(password=password, hashedPass=user.hashed_password):
            return None
        return user
    
    @staticmethod
    async def createUser(username:str , email:str, password:str, team_name: str, team_member: List, role_name: str, image_url: str):
        user_doc = User(
            name = username,
            email = email,
            hashed_password = getPassword(password),
            team_name = team_name,
            team_member = list(team_member),
            role_name = role_name,
            image_url = image_url
        )
        await user_doc.save()
        return user_doc
    
    @staticmethod
    async def updateUser(user_id: str, username: str = None, password: str = None, team_name: str = None, team_member: str = None, image_url: str = None):
        user_id = ObjectId(user_id)
        user = await User.find_one(user_id == User.id)
        if username is not None:
            user.name = username
        if password is not None:
            user.hashed_password = getPassword(password)
        if team_name is not None:
            user.team_name = team_name
        if team_member is not None:
            user.team_member.append(team_member)
        if image_url is not None:
            user.image_url = image_url
        await user.save()
        return user
    
    @staticmethod
    async def deleteTeamMember(user_id:str, team_member: str = None):
        user_id = ObjectId(user_id)
        user = await User.find_one(user_id == User.id)
        try:
            user.team_member.remove(team_member)
            await user.save()
            return "Team Member Deleted Successfully"
        except:
            return "Member not found"
   
    
   
    
