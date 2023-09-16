from pydantic import BaseModel

class RoleIn(BaseModel):
    name: str
    description: str