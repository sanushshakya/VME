from typing import Optional
from api.models.eventsModel import Events
from api.models.categoriesModel import Categories
from api.schemas.eventsSchema import EventsIn
from beanie.operators import Eq, In



class EventsServices:
    @staticmethod
    async def readEvents(title: str) -> Optional[Events]:
        event_in = await Events.find_one(Events.title == title)
        return event_in

    @staticmethod
    async def createEvents(event: EventsIn):
        event_in = Events(
            title = event.title,
            description = event.description,
            date = event.date,
            category = Categories(
                name = event.category.name,
                description = event.category.description
            ),
            organiser = event.organiser
        )
        await event_in.save()
        return event_in
    
    @staticmethod
    async def readEventsbyCategory(name: str) -> Optional[Events]:
        event_in = await Events.find(Events.category.name == name).to_list()
        return event_in

    
