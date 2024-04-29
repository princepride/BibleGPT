from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core import get_response_synthesizer
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import VectorStoreIndex, ServiceContext
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core.indices.query.query_transform import HyDEQueryTransform
from llama_index.core.query_engine import TransformQueryEngine
import chromadb
import os

class VectorEmbedding:
    def __init__(self):
        os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
        db = chromadb.PersistentClient(path="./chroma_db")
        chroma_collection = db.get_or_create_collection("bible_vector")
        vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
        index = VectorStoreIndex.from_vector_store(
            vector_store,
            embed_model=OpenAIEmbedding(),
        )
        service_context = ServiceContext.from_defaults(llm=None, embed_model=OpenAIEmbedding())
        self.vector_retriever = VectorIndexRetriever(index=index, similarity_top_k=3, service_context=service_context)

    def query_and_rerank(self, query, use_hyde = False):
        if use_hyde:
            os.environ["ANTHROPIC_API_KEY"] = os.getenv("CLAUDE_API_KEY")
            hyde = HyDEQueryTransform(llm=OpenAI(model="gpt-3.5-turbo"), include_original=True)
            response_synthesizer = get_response_synthesizer(llm=OpenAI(model="gpt-3.5-turbo"))
            query_engine = RetrieverQueryEngine(
                retriever=self.vector_retriever,
                response_synthesizer=response_synthesizer,
            )
            hyde_query_engine = TransformQueryEngine(query_engine, hyde)
            retrieved_nodes = hyde_query_engine.retrieve(query)
        else:
            retrieved_nodes = self.vector_retriever.retrieve(query)
        return retrieved_nodes
