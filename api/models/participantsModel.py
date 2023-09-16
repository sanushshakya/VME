from beanie import Document, PydanticObjectId
from pydantic import Field
from typing import Optional
from pymongo import IndexModel, ASCENDING
import datetime

class Participant(Document):
    team_name: str = Field(unique=True)
    member: Optional[list]
    description: str
    u_id: PydanticObjectId = None
    evt_id: PydanticObjectId = None
    
    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    class collection:
        name = "participants"
        indexes = [IndexModel([("u_id", ASCENDING)])]