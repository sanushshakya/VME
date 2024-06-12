from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from api.schemas.categoriesSchema import CategoriesIn

class EventsIn(BaseModel):
    evt_name: str = Field(..., min_length=5,max_length=50, description="event name")
    date: str
    cat_name: str
    location: str
    deadline: str
    sub_title:str
    description: str = Field(..., description="event describe")
    image_url: Optional[str]
    u_id: str
    
    