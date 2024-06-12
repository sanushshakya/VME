#import base setting from pydantic
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from decouple import config
from typing import List

#Define CommomnSetting class (inherit from BaseSetting)
class CommonSettings(BaseSettings):
    APP_NAME: str = "/api"
    DEBUG_MODE: bool = True
    PROJECT_NAME: str = "VME"

class JwtSetting(BaseSettings):
    JWT_SECRET_KEY: str = "supersecretkey"
    JWT_REFRESH_SECRET_KEY: str = "superrefreshsecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_MINUTES:  int = 60*24*7
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    

#Define the ServerSetting class (inherit from BaseSetting)
class ServerSettings(BaseSettings):
    HOST: str = "localhost"
    PORT: int = 8000

#Define the DatabaseSetting class (inherits from BaseSetting)
class DatabaseSettings(BaseSettings):
    DB_URL: str = "mongodb://localhost:27017/?directConnection=true"
    DB_NAME: str = "VME"

#MainSetting class that includes all the setting classes
class Settings(CommonSettings, JwtSetting ,ServerSettings, DatabaseSettings):
    pass

#create a setting variable that we'll use in the other files
settings = Settings()