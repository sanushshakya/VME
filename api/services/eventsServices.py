from typing import Optional
from api.models.eventsModel import Events
from api.schemas.eventsSchema import EventsIn


class EventsServices:
    @staticmethod
    async def readEvents() -> Optional[Events]:
        event_in = await Events.find_all()
        return event_in

    @staticmethod
    async def createEvents(event: EventsIn):
        event_in = Events(
            title = event.title,
            description = event.description,
            date = event.date,
            organiser = event.organiser
        )
        await event_in.save()
        return event_in