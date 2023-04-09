from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from typing import List

class CategoriesIn(BaseModel):
    title: str = Field(..., min_length=5,max_length=50, description="category name")
    description: str = Field(..., description="category describe")
    events_list: List

class CategoriesEvt(BaseModel):
    title: str = Field(..., min_length=5,max_length=50, description="category name")
