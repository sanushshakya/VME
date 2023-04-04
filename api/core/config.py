#import base setting from pydantic
from pydantic import BaseSettings

#Define CommomnSetting class (inherit from BaseSetting)
class CommonSettings(BaseSettings):
    APP_NAME: str = "/api"
    DEBUG_MODE: bool = True
    PROJECT_NAME: str = "VME"

#Define the ServerSetting class (inherit from BaseSetting)
class ServerSettings(BaseSettings):
    HOST: str = "localhost"
    PORT: int = 8000

#Define the DatabaseSetting class (inherits from BaseSetting)
class DatabaseSettings(BaseSettings):
    DB_URL: str = "mongodb://localhost:27017/?directConnection=true"
    DB_NAME: str = "VME"

#MainSetting class that includes all the setting classes
class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass

#create a setting variable that we'll use in the other files
settings = Settings()