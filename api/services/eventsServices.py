from typing import Optional
from api.models.eventsModel import Events
from api.models.userModel import User
from api.models.categoriesModel import Categories
from api.schemas.eventsSchema import EventsIn
from beanie.operators import Eq, In
from fastapi import HTTPException, status
from bson import ObjectId
from api.api.helpers.send_email import send_email_success, send_email_reject
from api.models.participantsModel import Participant
from api.api.helpers.tieSheet import TournamentScheduler


class EventsServices:
    @staticmethod
    async def readEvents():
        return await Events.find_all().to_list()
    
    @staticmethod
    async def readEventsByStatusPending():
        return await Events.find({"status": "pending"}).to_list()
    
    @staticmethod
    async def readEventsbyCategory(cat_name: str):
        event_doc = await Categories.find_one({"cat_name": cat_name})
        if not event_doc:
            raise HTTPException(status_code=404, detail="Categories not found")
        events = await Events.find({"cat_name": event_doc.cat_name}).to_list()
        return events
    
    @staticmethod
    async def readEventsbyId(event_id: str):
        try:
            object_id = ObjectId(event_id)
            event_doc = await Events.find_one({"_id": object_id})
            return event_doc
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
    @staticmethod
    async def readEventsbyUser(user: str):
        try:
            user = ObjectId(user)
            return await Events.find(user == Events.user_id).to_list()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @staticmethod
    async def readParticipantByEvent(evt_id: str):
        event_id = ObjectId(evt_id)
        teams = await Participant.find(event_id == Participant.evt_id).to_list()
        team_list = []
        for team in teams:
            team_list.append(team.team_name)
        scheduler = TournamentScheduler()
        schedule = scheduler.get_round_robin_schedule(team_list)
        return schedule

    @staticmethod
    async def createEvents(evt_name: str, date: str, cat_name: str, location:str, deadline:str, sub_title:str, description:str, image_url: str, user_id: str):
        event_doc = Events(
            evt_name = evt_name,
            date = date,
            cat_name = cat_name,
            location = location,
            deadline = deadline,
            sub_title = sub_title,
            description = description,
            image_url = image_url,
            user_id = user_id,
            status = "pending"  # Set the initial status to "pending"
        ) 
        await event_doc.save()
        return event_doc
       
    @staticmethod
    async def updateEvents(evt_id: str, evt_name: str, date: str, cat_name: str, location:str, deadline:str, sub_title:str, description:str, image_url: str, status: str):
        evt_id = ObjectId(evt_id)
        evt = await Events.find_one(evt_id == Events.id)
        user = await User.find_one(evt.user_id == User.id)
        print(user.email)
        if evt_name is not None:
            evt.evt_name = evt_name
        if date is not None:
            evt.date = date
        if cat_name is not None:
            evt.cat_name = cat_name
        if location is not None:
            evt.location = location
        if deadline is not None:
            evt.deadline = deadline
        if sub_title is not None:
            evt.sub_title = sub_title
        if description is not None:
            evt.description = description
        if image_url is not None:
            evt.image_url = image_url
        if evt_name is not None:
            evt.evt_name = evt_name
           
        if status is not None:
            evt.status = status
             # Attempt to send the email
            try:
                send_email_success(user.email)
            except Exception as email_error:
                # Handle the email sending error here (e.g., log the error)
                print(f"Email sending error: {str(email_error)}")
                # Optionally, you can choose to retry sending the email here
        await evt.save()
        return evt
    
    @staticmethod
    async def deleteEvent(evt_id:str):
        evt_id = ObjectId(evt_id)
        evt = await Events.find_one(evt_id == Events.id)
        user = await User.find_one(evt.user_id == User.id)
        try:
            send_email_reject(user.email)
        except Exception as email_error:
            # Handle the email sending error here (e.g., log the error)
            print(f"Email sending error: {str(email_error)}")
            # Optionally, you can choose to retry sending the email here
        await evt.delete()
        return "Event Deleted Successfully"
        
        
    
   

    
