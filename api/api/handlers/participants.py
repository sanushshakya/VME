from fastapi import APIRouter, HTTPException, status, Request, Form
from api.services.participantsServices import ParticipantService
from beanie import PydanticObjectId
import pymongo

participantRouter = APIRouter()

@participantRouter.get("/read", summary = "Read Participants")
async def readParticipant():
    try:
        return await ParticipantService.readParticipant()
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail =  "Participant not found"
        )
        
@participantRouter.get("/read_event_participated_by_user/{u_id}", summary="Read participants by user id")
async def readParticipantsByUser(u_id: str):
    try:
        return await ParticipantService.readEventParticipatedByUser(u_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Participant not found"
        )
        
@participantRouter.get("/check_if_participated/{u_id}/{evt_id}", summary="Read participants by user id")
async def checkIfParticipated(u_id: str, evt_id:str):
    try:
        return await ParticipantService.checkIfParticipated(u_id, evt_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Participant not found"
        )
        
@participantRouter.get("/read_by_event/{evt_id}", summary="Read participants by user id")
async def readParticipantsByEvent(evt_id: str):
    try:
        return await ParticipantService.readParticipantByEvent(evt_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Participant not found"
        )
        
@participantRouter.post("/create", summary="Create new participants")
async def createParticipant(team_name: str= Form(...), member:list= Form(...), description: str= Form(...), u_id: str = Form(...), evt_id: str = Form(...)):
    try:
        return await ParticipantService.createParticipant(team_name,member,description,u_id, evt_id)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Participant already exists."
        )