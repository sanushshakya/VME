from fastapi import APIRouter, HTTPException, status, Request
import pymongo
from api.schemas.categoriesSchema import CategoriesIn
from api.services.categoriesServices import CategoriesServices

catRouter = APIRouter()

@catRouter.post("/create", summary="create new category")
async def createCategory(data: CategoriesIn):
    try:
        return await CategoriesServices.createCategories(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Category already exists."
        )