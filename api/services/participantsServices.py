from api.models.participantsModel import Participant
from api.models.eventsModel import Events
from api.models.userModel import User
from api.services.eventsServices import EventsServices
from fastapi import HTTPException
from beanie import PydanticObjectId
from bson import ObjectId
from api.api.helpers.send_email import send_email_user


class ParticipantService:
    
    @staticmethod
    async def readParticipant():
        return await Participant.find_all().to_list()
    
    @staticmethod
    async def readEventParticipatedByUser(u_id: str):
        user_id = ObjectId(u_id)
        par = await Participant.find(user_id == Participant.u_id).to_list()
        events = []
        for i in par:
            evt = await Events.find_one(i.evt_id == Events.id)
            events.append(evt)
        return events
    
    @staticmethod
    async def checkIfParticipated(u_id: str, evt_id:str):
        user_id = ObjectId(u_id)
        evt_id = ObjectId(evt_id)
        par = await Participant.find(user_id == Participant.u_id).to_list()
        
        for i in par:
            evt = await Events.find_one(i.evt_id == Events.id)
            if(evt.id==evt_id):
                return evt

    @staticmethod
    async def readParticipantByEvent(evt_id: str):
        event_id = ObjectId(evt_id)
        return await Participant.find(event_id == Participant.evt_id).to_list()
    
    
    @staticmethod
    async def createParticipant(team_name: str, member:list, description: str, u_id: str,evt_id: str):
        user_id = ObjectId(u_id)
        user = await User.find_one(user_id == User.id)
        event_id = ObjectId(evt_id)
        participant_doc = Participant(
            team_name = team_name,
            member = list(member),
            description = description,
            u_id = user_id,
            evt_id = event_id
        )
        try:
            send_email_user(user.email)
        except Exception as email_error:
            # Handle the email sending error here (e.g., log the error)
            print(f"Email sending error: {str(email_error)}")
            # Optionally, you can choose to retry sending the email here
        await participant_doc.save()
        return participant_doc