from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4
from datetime import datetime
from typing import List, Optional


class Categories(Document):
    cat_id: UUID = Field(default_factory=uuid4)
    name: Indexed(str, unique = True)
    description: Optional[str] = None

    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    class collection:
        name = "categories"