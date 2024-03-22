from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from model import Model
from vector_embedding import VectorEmbedding
import time

app = FastAPI()
model = Model()
vector_embedding = VectorEmbedding()

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

    query = data[-1].content
    vectors = vector_embedding.query_and_rerank(query)
    prompt = '\n'.join(vectors.text)
    for d in data[-3:]:
        prompt += d.agent
        prompt += d.content
        prompt += "</s>"
    response = model.generate(prompt)

    attachments = [{'book': vector.metadata.book, 'chapter': vector.metadata.chapter, 'content': vector.text} for vector in vectors]

    return {
        'agent': '<|assistant|>',
        'content': {response},
        'attachments': {attachments}
    }
