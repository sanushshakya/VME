from typing import Optional
from api.models.categoriesModel import Categories
from api.schemas.categoriesSchema import CategoriesIn
from api.schemas.eventsSchema import EventsIn

class CategoriesServices:
    @staticmethod
    async def readCategories() -> Optional[Categories]:
        category_in = await Categories.find_one()

        return category_in

    @staticmethod
    async def createCategories(category: CategoriesIn):
        category_in = Categories(
            title = category.title,
            description = category.description
        )
        await category_in.save()
        return category_in