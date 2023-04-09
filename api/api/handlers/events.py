from fastapi import APIRouter, HTTPException, status, Request
import pymongo
from api.schemas.eventsSchema import EventsIn
from api.services.eventsServices import EventsServices

evtRouter = APIRouter()

@evtRouter.get("/read")
async def readUser(title: str):
    try:
        return await EventsServices.readEvents(title)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )

@evtRouter.post("/create", summary="create new event")
async def createEvent(data: EventsIn):
    try:
        return await EventsServices.createEvents(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Event already exists."
        )