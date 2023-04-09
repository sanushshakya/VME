from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from typing import List

class CategoriesIn(BaseModel):
    name: str = Field(..., min_length=5,max_length=50, description="category name")
    description: str = Field(..., description="category describe")
class CategoriesEvt(BaseModel):
    name: str = Field(..., min_length=5,max_length=50, description="category name")
