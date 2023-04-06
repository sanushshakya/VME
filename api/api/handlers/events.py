from fastapi import APIRouter, HTTPException, status, Request
import pymongo
from api.schemas.eventsSchema import EventsIn
from api.services.eventsServices import EventsServices

evtRouter = APIRouter()

@evtRouter.post("/create", summary="create new event")
async def createEvent(data: EventsIn):
    try:
        return await EventsServices.createEvents(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Event already exists."
        )