from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from typing import List

class CategoriesIn(BaseModel):
    cat_name: str = Field(..., min_length=5,max_length=50, description="category name")
    description: str = Field(..., description="category describe")
    image_url: str
    
class CategoriesEvt(BaseModel):
    cat_name: str = Field(..., min_length=5,max_length=50, description="category name")
