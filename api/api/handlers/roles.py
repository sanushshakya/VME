from fastapi import APIRouter, HTTPException, status, Request
from api.schemas.roleSchema import RoleIn
from api.services.roleServices import RoleServices

roleRouter = APIRouter()

@roleRouter.get("/read",summary="Read Role")
async def readRole():
    try:
        return await RoleServices.readRole()
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Role not found"
        )
        
@roleRouter.post("/create",summary="Create new Role", response_model=RoleIn)
async def createRole(data: RoleIn):
    try:
        return await RoleServices.createRole(data)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Role already exists."
        )
        
        