from fastapi import FastAPI
from typing import Optional

app = FastAPI()

@app.get("/")
def read_item(query: Optional[str]=None):
    return query