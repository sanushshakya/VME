from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def getPassword(password: str) -> str:
    return password_context.hash(password)

def verifyPassword(password: str, hashedPass: str) -> bool:
    return password_context.verify(password, hashedPass) 