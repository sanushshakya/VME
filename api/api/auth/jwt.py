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

@authRouter.post("/login", summary="Create access and refresh token")
async def login(formData: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await UserService.authenticate(email = formData.username, password = formData.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wrong Credentials"
        )
    return {
        "accessToken": createAccessToken(user.user_id),
        "refreshToken": createRefreshToken(user.user_id),
    }
    
@authRouter.post("/refresh-token", summary="Refresh access token")
async def refresh_token(refresh_token: str):
    user = await getCurrentUser(refresh_token)
    return user
    
@authRouter.post("/test-token/{accessToken}", summary="Test if the token is valid")
async def testToken(accessToken: str):
    user = await getCurrentUser(accessToken)
    return user