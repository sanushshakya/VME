from api.schemas.userSchema import UserAuth
from api.models.userModel import User
from api.core.security import getPassword

class UserService:
    @staticmethod
    async def createUser(user: UserAuth):
        user_in = User(
            name = user.name,
            email = user.email,
            hashed_password = getPassword(user.password)
        )
        await user_in.save()
        return user_in