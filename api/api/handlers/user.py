from fastapi import APIRouter, HTTPException, status
import pymongo
from api.schemas.userSchema import UserAuth
from api.services.UserService import UserService

userRouter = APIRouter()

@userRouter.post("/create")
async def createUser(data: UserAuth):
    try:
       return await UserService.createUser(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "User already exists."
        )