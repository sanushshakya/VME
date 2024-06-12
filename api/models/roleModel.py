from beanie import Document

class Role(Document):
    name: str
    description: str