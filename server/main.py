from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from model import LocalModel, ClaudeModel, ChatGPTModel
from vector_embedding import VectorEmbedding

app = FastAPI()
model = ChatGPTModel() #LocalModel()
vector_embedding = VectorEmbedding()

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
