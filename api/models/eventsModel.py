from pydantic import Field
from beanie import Document, Indexed, PydanticObjectId
from datetime import datetime
from api.models.categoriesModel import Categories
from typing import Optional

class Events(Document):
    evt_name: str
    date: str
    location: str
    cat_name: str
    deadline: str
    sub_title:str
    description: str
    image_url: Optional[str]
    user_id: PydanticObjectId = None
    status: str = Field(default="pending")

    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    class collection:
        name = "categories"