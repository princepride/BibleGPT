from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from model import LocalModel, ClaudeModel, ChatGPTModel
from vector_embedding import VectorEmbedding
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from jose import JWTError, jwt
from models import User

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()
model = ChatGPTModel() #LocalModel()
vector_embedding = VectorEmbedding()

fake_users_db = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许的源,可以设置多个
    allow_credentials=True,
    allow_methods=["*"],  # 允许的 HTTP 方法
    allow_headers=["*"],  # 允许的 Headers
)

@app.post("/")
async def chat(request: Request):
    request = await request.json()
    chatData = request['chatData']
    query = chatData[-1]['content']
    vectors = vector_embedding.query_and_rerank(query)
    response = model.generate(vectors, chatData)
    attachments = [{'book': vector.metadata['book'], 'chapter': vector.metadata['chapter'], 'content': vector.get_text()} for vector in vectors]
    # attachments = [{'book': vector.metadata['book'], 'chapter': vector.metadata['chapter'], 'content': vector.metadata['book']+"第"+str(vector.metadata['chapter']+1)+"章："+vector.get_text()[:5]+"..."} for vector in vectors]

    return {
        'agent': 'assistant',
        'content': response,
        'attachments': attachments
    }

def get_user(username: str):
    if username in fake_users_db:
        user_dict = fake_users_db[username]
        return User(**user_dict)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not bcrypt.verify(password, user.password):
        return False
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return access_token

@app.post("/register")
def register(user: User):
    hashed_password = bcrypt.hash(user.password)
    fake_users_db[user.username] = {"username": user.username, "password": hashed_password}
    return {"message": "User created successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
        user = get_user(username)
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")