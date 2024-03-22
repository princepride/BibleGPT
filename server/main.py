from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # 允许的源,可以设置多个
    allow_credentials=True,
    allow_methods=["*"],  # 允许的 HTTP 方法
    allow_headers=["*"],  # 允许的 Headers
)

@app.post("/")
async def chat(request: Request):
    data = await request.json()
    print(data)
    time.sleep(5)
    return {
        'agent': '<|assistant|>',
        'content': 'I am doing well, thank you for asking. How can I assist you today?',
        'attachments': [
            {'book': "历代志上", 'chapter': 8, 'content': "test6"},
            {'book': "传道书", 'chapter': 1, 'content': "test5"}
        ]
    }