from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from typing import Optional

class ParticipantOut(BaseModel):
    team_name: str
    member: Optional[list]
    description: str
    u_id: PydanticObjectId
    evt_id: PydanticObjectId