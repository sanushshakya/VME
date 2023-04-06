from api.schemas.userSchema import UserAuth, UserUpdate
from api.models.userModel import User
from api.core.security import getPassword, verifyPassword
from typing import Optional
from uuid import UUID

class UserService:
    @staticmethod
    async def readUser(email: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        return user
    
    @staticmethod
    async def readUserById(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id)
        return user


    @staticmethod
    async def createUser(user: UserAuth):
        user_in = User(
            name = user.name,
            email = user.email,
            hashed_password = getPassword(user.password)
        )
        await user_in.save()
        return user_in
    
    @staticmethod
    async def authenticate(email:str, password:str) -> Optional[User]:
        user = await UserService.readUser(email=email)
        if not user:
            return None
        if not verifyPassword(password=password, hashedPass=user.hashed_password):
            return None
        
        return user
    
