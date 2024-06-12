from fastapi import APIRouter, Form, HTTPException, status, Request, File, UploadFile
import pymongo
from beanie import PydanticObjectId
from api.schemas.categoriesSchema import CategoriesIn
from api.services.categoriesServices import CategoriesServices
from api.api.helpers.savePicture import save_picture

catRouter = APIRouter()

@catRouter.get("/read")
async def readCategories():
    try:
        return await CategoriesServices.readCategories()
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Category not found"
        )
        
@catRouter.get("/read_by_id/{cat_id}")
async def readCategoriesById(cat_id: str):
    try:
        return await CategoriesServices.readCategoriesById(cat_id)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Category not found"
        )
        
@catRouter.get("/read_with_events/{cat_name}")
async def readCategoriesWithEvents(cat_name: str):
    try:
        return await CategoriesServices.readCategoriesWithEvents(cat_name)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Category not found"
        )
            
@catRouter.post("/create", summary="create new category")
async def createCategory(cat_name:str = Form(...), 
                         description:str = Form(...), 
                         image_url:UploadFile = File(...)):
    try:
        imageUrl = save_picture(file=image_url, folderName='categories', fileName = cat_name)
        return await CategoriesServices.createCategories(cat_name,description,imageUrl)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Category already exists."
        )
        
@catRouter.delete("/delete/{cat_id}", summary="Delete category")
async def deleteEvent(cat_id: str):
    try:
        return await CategoriesServices.deleteCat(cat_id)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_404_BAD_REQUEST,
            detail = "Category not found."
        )