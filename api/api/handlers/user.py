from fastapi import APIRouter, HTTPException, status, Request
import pymongo
from api.schemas.userSchema import UserAuth, UserOut
from api.services.UserService import UserService


userRouter = APIRouter()

@userRouter.get("/read/{email}", summary="Read User", response_model=UserOut)
async def readUser(email: str, request: Request):
    try:
        return await UserService.readUser(email)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found"
        )

@userRouter.post("/create", summary="Create new User", response_model=UserOut)
async def createUser(data: UserAuth):
    try:
       return await UserService.createUser(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "User already exists."
        )