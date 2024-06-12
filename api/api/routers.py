from fastapi import APIRouter
from api.api.handlers import user, roles, categories, events, participants
from api.api.auth.jwt import authRouter

router =  APIRouter()

router.include_router(user.userRouter, prefix="/user", tags=["users"])
router.include_router(roles.roleRouter, prefix="/role", tags=["roles"])
router.include_router(categories.catRouter, prefix="/categories",tags=["categories"])
router.include_router(events.evtRouter, prefix="/events",tags=["events"])
router.include_router(participants.participantRouter, prefix="/participants", tags=["participants"])
router.include_router(authRouter, prefix="/auth", tags=["auths"])