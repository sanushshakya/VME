from fastapi import APIRouter, Depends, HTTPException,status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from api.services.UserService import UserService
from api.core.security import createAccessToken, createRefreshToken
from api.schemas.authSchema import TokenSchema
from api.schemas.userSchema import UserOut
from api.models.userModel import User
from api.api.deps.userDeps import getCurrentUser

authRouter = APIRouter()

@authRouter.post("/login", summary="Create access and refresh token", response_model=TokenSchema)
async def login(formData: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await UserService.authenticate(email = formData.username, password = formData.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wrong Credentials"
        )
    
    return {
        "accessToken": createAccessToken(user.user_id),
        "refreshToken": createRefreshToken(user.user_id)
    }

@authRouter.post("/test-token", summary="Test if the token is valid", response_model=UserOut)
async def testToken(user: User = Depends(getCurrentUser)):
    return user