#Imports
from fastapi import FastAPI
from beanie import init_beanie
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from api.core.config import settings
from api.api.routers import router
from api.models.userModel import User
from api.models.categoriesModel import Categories
from api.models.eventsModel import Events

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.APP_NAME}/openapi.json"
)

#Startup Event
@app.on_event("startup")
async def startup_db_client():
    db_client = AsyncIOMotorClient(settings.DB_URL).vme

    await init_beanie(
        database = db_client,
        document_models= [
            User,
            Categories,
            Events
        ]
    )

#Shutdown Event
# @app.on_event("shutdown")
# async def shutdown_db_client():
#     db_client.close()

#include our  API router
app.include_router(router,prefix=settings.APP_NAME)

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG_MODE
        )