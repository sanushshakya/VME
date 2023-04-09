from typing import Optional
from api.models.eventsModel import Events
from api.models.categoriesModel import Categories
from api.schemas.eventsSchema import EventsIn



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
            type = Categories(
                title = event.type.title,
                description = event.type.description
            ),
            organiser = event.organiser
        )
        await event_in.save()
        return event_in
    
