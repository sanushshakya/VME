# Imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from api.core.config import settings
from api.api.routers import router
from api.models.userModel import User
from api.models.roleModel import Role
from api.models.categoriesModel import Categories
from api.models.eventsModel import Events
from api.models.participantsModel import Participant
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.APP_NAME}/openapi.json"
)

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://vme-chi.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

# Startup Event
@app.on_event("startup")
async def startup_db_client():
    db_client = AsyncIOMotorClient(settings.DB_URL).vme

    await init_beanie(
        database=db_client,
        document_models=[
            User,
            Role,
            Categories,
            Events,
            Participant
        ]
    )

# Shutdown Event
@app.on_event("shutdown")
async def shutdown_db_client():
    db_client = AsyncIOMotorClient(settings.DB_URL)
    db_client.close()

# Include our API router
app.include_router(router, prefix=settings.APP_NAME)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG_MODE
    )
