from fastapi import FastAPI, Request
from typing import Optional
import time

app = FastAPI()

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