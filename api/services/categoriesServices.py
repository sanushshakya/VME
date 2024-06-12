from typing import Optional
from api.models.categoriesModel import Categories
from api.schemas.categoriesSchema import CategoriesIn
from api.models.eventsModel import Events
from beanie import PydanticObjectId
from bson import ObjectId
from fastapi import HTTPException, status

class CategoriesServices:
    @staticmethod
    async def readCategories():
        return await Categories.find_all().to_list()
    
    @staticmethod
    async def readCategoriesWithEvents(cat_name: str):
        event = await Events.find(cat_name == Events.cat_name).to_list()
        return event
    
    @staticmethod
    async def readCategoriesById(cat_id: str):
        try:
            object_id = ObjectId(cat_id)
            cat_doc = await Categories.find_one({"_id": object_id})
            return cat_doc
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @staticmethod
    async def createCategories(cat_name,description,image_url):
        category_doc = Categories(
            cat_name = cat_name,
            description = description,
            image_url = image_url
        )
        await category_doc.save()
        return category_doc
    
    @staticmethod
    async def deleteCat(cat_id:str):
        cat_id = ObjectId(cat_id)
        cat = await Categories.find_one(cat_id == Categories.id)
        await cat.delete()
        return "Category Deleted Successfully"