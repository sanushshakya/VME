from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID

class EventsIn(BaseModel):
    title: str = Field(..., min_length=5,max_length=50, description="event name")
    description: str = Field(..., description="event describe")
    date: str
    organiser: str = Field(..., min_length=5,max_length=50, description="user name")
    