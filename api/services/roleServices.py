from api.models.roleModel import Role
from fastapi import HTTPException
from api.schemas.roleSchema import RoleIn

class RoleServices:
    @staticmethod
    async def readRole():
        return await Role.find_all().to_list()
    
    @staticmethod
    async def createRole(role: RoleIn):
        role_doc = Role(**role.dict())
        await role_doc.save()
        return role_doc