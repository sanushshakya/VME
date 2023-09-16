from fastapi import APIRouter, HTTPException, status, Request, Form
import pymongo
from api.schemas.userSchema import UserAuth, UserOut
from api.services.UserService import UserService
from api.api.helpers.savePicture import save_picture
from fastapi import status, File, UploadFile
from typing import List
from beanie import PydanticObjectId

userRouter = APIRouter()

@userRouter.get("/read", summary="Read User")
async def readUser():
    try:
        return await UserService.readUser()
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found"
        )
        
@userRouter.get("/read_by_email/{email}", summary="Read User")
async def readUserByEmail(email: str):
    try:
        return await UserService.readUserByEmail(email)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found"
        )

@userRouter.get("/read_by_role_name", summary="Read User")
async def readUserByRole(name: str):
    try:
        return await UserService.get_users_by_role(name)
    except:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found"
        )
        
@userRouter.post("/create", summary="Create new User")
async def createUser(username:str= Form(...) , email:str = Form(...), password:str= Form(...), team_name: str= Form(...), team_member: str = Form(...), role_name: str= Form(...), image_url: UploadFile = File(...)):
    team_member = team_member.split(",") if team_member else None
    try:
        image_url = save_picture(file=image_url, folderName='users', fileName = username)
        return await UserService.createUser(username,email,password,team_name, team_member,role_name,image_url)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "User already exists."
        )

@userRouter.put("/update/{user_id}", summary = "Update User Info")
async def updateUser(user_id: str, username:str= Form(default=None) , password:str= Form(default=None), team_name: str= Form(default=None), team_member: str = Form(default=None), image_url: UploadFile = File(default=None)):
    try:
        if image_url is None:
            return await UserService.updateUser(user_id, username,password, team_name, team_member,image_url)
        image_url = save_picture(file=image_url, folderName='users', fileName = 'user')
        return await UserService.updateUser(user_id, username,password, team_name, team_member,image_url)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_404_BAD_REQUEST,
            detail = "User doesn't exists."
        )
        
@userRouter.delete("/delete/{user_id}/{team_member}", summary="Delete team member")
async def deleteEvent(user_id: str, team_member: str ):
    try:
        return await UserService.deleteTeamMember(user_id, team_member)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code = status.HTTP_404_BAD_REQUEST,
            detail = "User not found."
        )