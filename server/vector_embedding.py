from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core import get_response_synthesizer
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import VectorStoreIndex, ServiceContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.schema import QueryBundle
from llama_index.core.postprocessor import SentenceTransformerRerank
from llama_index.llms.anthropic import Anthropic
from llama_index.core.indices.query.query_transform import HyDEQueryTransform
from llama_index.core.query_engine import TransformQueryEngine
import chromadb

class VectorEmbedding:
    def __init__(self):
        jinaAI_base_embedding_model = HuggingFaceEmbedding(model_name='jinaai/jina-embeddings-v2-base-zh', pooling='mean', trust_remote_code=True)
        db = chromadb.PersistentClient(path="./chroma_db")
        chroma_collection = db.get_or_create_collection("bible_vector")
        vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
        index = VectorStoreIndex.from_vector_store(
            vector_store,
            embed_model=jinaAI_base_embedding_model,
        )
        service_context = ServiceContext.from_defaults(llm=None, embed_model=jinaAI_base_embedding_model)
        self.vector_retriever = VectorIndexRetriever(index=index, similarity_top_k=10, service_context=service_context)
        self.bge_reranker_large_rerank=SentenceTransformerRerank(model="BAAI/bge-reranker-large", top_n=3)

    def query_and_rerank(self, query, use_hyde = False):
        if use_hyde:
            import os
            os.environ["ANTHROPIC_API_KEY"] = os.getenv("CLAUDE_API_KEY")
            hyde = HyDEQueryTransform(llm=Anthropic(model="claude-3-haiku-20240307"), include_original=True)
            response_synthesizer = get_response_synthesizer(llm=Anthropic(model="claude-3-haiku-20240307"))
            query_engine = RetrieverQueryEngine(
                retriever=self.vector_retriever,
                response_synthesizer=response_synthesizer,
            )
            hyde_query_engine = TransformQueryEngine(query_engine, hyde)
            retrieved_nodes = hyde_query_engine.retrieve(query)
        else:
            retrieved_nodes = self.vector_retriever.retrieve(query)
        return self.bge_reranker_large_rerank.postprocess_nodes(retrieved_nodes, QueryBundle(query))
