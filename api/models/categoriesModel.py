from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4
from datetime import datetime
from typing import List


class Categories(Document):
    cat_id: UUID = Field(default_factory=uuid4)
    title: Indexed(str, unique = True)
    description: str
    events_list: List

    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    class collection:
        name = "categories"