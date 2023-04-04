from fastapi import APIRouter
from api.api.handlers import user


router =  APIRouter()

router.include_router(user.userRouter, prefix="/user", tags=["users"])