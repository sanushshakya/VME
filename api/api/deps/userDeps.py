from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException,status
from jose import jwt
from datetime import datetime
from pydantic import ValidationError
from api.models.userModel import User
from api.schemas.authSchema import TokenPayload
from api.core.config import settings
from api.services.UserService import UserService


reuseableOAuth = OAuth2PasswordBearer(
    tokenUrl = "/api/auth/login",
    scheme_name = "jwt"
)

async def getCurrentUser(token: str):
    try: 
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        tokenData = TokenPayload(**payload)

        if datetime.fromtimestamp(tokenData.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentails",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    user = await UserService.get_users_by_id(tokenData.sub)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user