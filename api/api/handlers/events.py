from fastapi import APIRouter, Form, HTTPException, status, Request,  File, UploadFile
import pymongo
from api.schemas.eventsSchema import EventsIn
from api.services.eventsServices import EventsServices
from api.api.helpers.savePicture import save_picture

evtRouter = APIRouter()

@evtRouter.get("/read")
async def readEvent():
    try:
        return await EventsServices.readEvents()
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )
        
@evtRouter.get("/read_by_category")
async def readEventByCategory(category: str):
    try:
        return await EventsServices.readEventsbyCategory(category)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )

        
@evtRouter.get("/read_by_id/{event_id}")
async def readEventById(event_id: str):
    try:
        return await EventsServices.readEventsbyId(event_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )

@evtRouter.get("/read_by_user/{user}")
async def readEventByUser(user: str):
    try:
        return await EventsServices.readEventsbyUser(user)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )

@evtRouter.get("/read_by_participant/{evt_id}")
async def readParticipantByEvent(evt_id: str):
    try:
        return await EventsServices.readParticipantByEvent(evt_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Event not found"
        )



@evtRouter.post("/create", summary="Create new event")
async def createEvent(evt_name: str = Form(...), 
                      date: str = Form(...), 
                      cat_name: str = Form(...)
                      , location:str = Form(...),
                      deadline:str = Form(...),
                      sub_title:str = Form(...),
                      description:str = Form(...), 
                      image_url: UploadFile = File(...),
                      user_id: str = Form(...) ):
    try:
        imageUrl = save_picture(file=image_url, folderName='events', fileName = evt_name)
        return await EventsServices.createEvents(evt_name, date, cat_name, location, deadline, sub_title, description, imageUrl, user_id)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Event already exists."
        )

@evtRouter.put("/update/{evt_id}", summary="Update event")
async def updateEvent(evt_id: str,
                      evt_name: str = Form(default=None), 
                      date: str = Form(default=None), 
                      cat_name: str = Form(default=None),   
                      location:str = Form(default=None),
                      deadline:str = Form(default=None),
                      sub_title:str = Form(default=None),
                      description:str = Form(default=None), 
                      image_url: UploadFile = File(default=None),
                      status: str = Form(default=None)):
    try:
        if image_url is None:
            return await EventsServices.updateEvents(evt_id, evt_name, date, cat_name, location, deadline, sub_title, description, image_url, status)
        image_url = save_picture(file=image_url, folderName='events', fileName = evt_name)
        return await EventsServices.updateEvents(evt_id, evt_name, date, cat_name, location, deadline, sub_title, description, image_url, status)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Event already exists."
        )
        
@evtRouter.delete("/delete/{evt_id}", summary="Delete event")
async def deleteEvent(evt_id: str):
    try:
        return await EventsServices.deleteEvent(evt_id)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_404_BAD_REQUEST,
            detail = "Event not found."
        )
        



