from flask import Flask, request, jsonify, render_template
import os
import uuid
import datetime
import logging
from azure.storage.blob import BlobServiceClient
from azure.cosmos import CosmosClient, PartitionKey
from azure.search.documents import SearchClient
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    SearchIndex,
    SimpleField,
    SearchableField,
    SearchFieldDataType,
    VectorSearch,
    VectorSearchAlgorithmConfiguration
)
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient
from openai import AzureOpenAI
import requests
from bs4 import BeautifulSoup
import fitz  # PyMuPDF
import io
import re
import time
import numpy as np
from tqdm import tqdm

# Initialize logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration
class Config:
    # Azure Storage configuration
    AZURE_STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
    AZURE_STORAGE_CONTAINER_NAME = "knowledge-documents"
    
    # Azure Cosmos DB configuration
    COSMOS_DB_ENDPOINT = os.environ.get("COSMOS_DB_ENDPOINT")
    COSMOS_DB_KEY = os.environ.get("COSMOS_DB_KEY")
    COSMOS_DB_DATABASE_NAME = "PersonalKnowledgeBase"
    COSMOS_DB_CONTAINER_NAME = "ContentMetadata"
    
    # Azure AI Search configuration
    SEARCH_SERVICE_ENDPOINT = os.environ.get("SEARCH_SERVICE_ENDPOINT")
    SEARCH_SERVICE_KEY = os.environ.get("SEARCH_SERVICE_KEY")
    SEARCH_INDEX_NAME = "personal-knowledge-index"
    
    # Azure OpenAI configuration
    AZURE_OPENAI_ENDPOINT = os.environ.get("AZURE_OPENAI_ENDPOINT")
    AZURE_OPENAI_API_KEY = os.environ.get("AZURE_OPENAI_API_KEY")
    AZURE_OPENAI_API_VERSION = "2023-05-15"
    AZURE_OPENAI_EMBEDDING_MODEL = "text-embedding-ada-002"
    AZURE_OPENAI_CHAT_MODEL = "gpt-4"
    
    # Azure Text Analytics configuration
    TEXT_ANALYTICS_ENDPOINT = os.environ.get("TEXT_ANALYTICS_ENDPOINT")
    TEXT_ANALYTICS_KEY = os.environ.get("TEXT_ANALYTICS_KEY")
    
    # Application configuration
    MAX_CHUNK_SIZE = 1000  # characters
    VECTOR_DIMENSION = 1536  # dimensions for the embedding model
    OVERLAP_SIZE = 100  # characters overlap between chunks
    FLASHCARD_COUNT = 5  # default number of flashcards to generate

# Initialize Azure Services
class AzureServices:
    def __init__(self):
        self.blob_service_client = None
        self.cosmos_client = None
        self.search_index_client = None
        self.search_client = None
        self.openai_client = None
        self.text_analytics_client = None
        self.initialize_services()
        
    def initialize_services(self):
        try:
            # Initialize Azure Blob Storage
            self.blob_service_client = BlobServiceClient.from_connection_string(
                Config.AZURE_STORAGE_CONNECTION_STRING)
            
            # Create container if it doesn't exist
            container_client = self.blob_service_client.get_container_client(
                Config.AZURE_STORAGE_CONTAINER_NAME)
            if not container_client.exists():
                container_client.create_container()
            
            # Initialize Azure Cosmos DB
            self.cosmos_client = CosmosClient(
                Config.COSMOS_DB_ENDPOINT, 
                credential=Config.COSMOS_DB_KEY
            )
            
            # Create database if it doesn't exist
            database = self.cosmos_client.create_database_if_not_exists(
                id=Config.COSMOS_DB_DATABASE_NAME
            )
            
            # Create container if it doesn't exist
            database.create_container_if_not_exists(
                id=Config.COSMOS_DB_CONTAINER_NAME,
                partition_key=PartitionKey(path="/id")
            )
            
            # Initialize Azure AI Search
            self.search_index_client = SearchIndexClient(
                endpoint=Config.SEARCH_SERVICE_ENDPOINT,
                credential=AzureKeyCredential(Config.SEARCH_SERVICE_KEY)
            )
            
            # Create search index if it doesn't exist
            if not self._index_exists():
                self._create_search_index()
            
            self.search_client = SearchClient(
                endpoint=Config.SEARCH_SERVICE_ENDPOINT,
                index_name=Config.SEARCH_INDEX_NAME,
                credential=AzureKeyCredential(Config.SEARCH_SERVICE_KEY)
            )
            
            # Initialize Azure OpenAI
            self.openai_client = AzureOpenAI(
                api_version=Config.AZURE_OPENAI_API_VERSION,
                azure_endpoint=Config.AZURE_OPENAI_ENDPOINT,
                api_key=Config.AZURE_OPENAI_API_KEY
            )
            
            # Initialize Azure Text Analytics
            self.text_analytics_client = TextAnalyticsClient(
                endpoint=Config.TEXT_ANALYTICS_ENDPOINT,
                credential=AzureKeyCredential(Config.TEXT_ANALYTICS_KEY)
            )
            
            logger.info("Successfully initialized all Azure services")
        
        except Exception as e:
            logger.error(f"Error initializing Azure services: {str(e)}")
            raise
    
    def _index_exists(self):
        try:
            indexes = list(self.search_index_client.list_indexes())
            for index in indexes:
                if index.name == Config.SEARCH_INDEX_NAME:
                    return True
            return False
        except Exception as e:
            logger.error(f"Error checking if index exists: {str(e)}")
            return False
    
    def _create_search_index(self):
        try:
            # Define vector search configuration
            vector_search = VectorSearch(
                algorithms=[
                    VectorSearchAlgorithmConfiguration(
                        name="vector-config",
                        kind="hnsw",
                        parameters={
                            "m": 4,
                            "efConstruction": 400,
                            "efSearch": 500,
                            "metric": "cosine"
                        }
                    )
                ]
            )
            
            # Define index fields
            fields = [
                SimpleField(name="id", type=SearchFieldDataType.String, key=True),
                SimpleField(name="content_id", type=SearchFieldDataType.String),
                SimpleField(name="source_type", type=SearchFieldDataType.String, filterable=True),
                SimpleField(name="title", type=SearchFieldDataType.String, filterable=True, sortable=True),
                SimpleField(name="url", type=SearchFieldDataType.String),
                SimpleField(name="uploaded_date", type=SearchFieldDataType.DateTimeOffset, filterable=True, sortable=True),
                SimpleField(name="chunk_id", type=SearchFieldDataType.String),
                SearchableField(name="content", type=SearchFieldDataType.String),
                SearchableField(name="content_vector", type=SearchFieldDataType.Collection(SearchFieldDataType.Single), 
                               vector_search_dimensions=Config.VECTOR_DIMENSION, 
                               vector_search_configuration="vector-config")
            ]
            
            # Create the index
            index = SearchIndex(name=Config.SEARCH_INDEX_NAME, fields=fields, vector_search=vector_search)
            self.search_index_client.create_index(index)
            logger.info(f"Created search index: {Config.SEARCH_INDEX_NAME}")
        
        except Exception as e:
            logger.error(f"Error creating search index: {str(e)}")
            raise

# Document processor for different content types
class DocumentProcessor:
    def __init__(self, azure_services):
        self.azure_services = azure_services
    
    def process_document(self, file_path=None, url=None, text_content=None, title=None, source_type=None):
        """Process documents from different sources (file, URL, or text)"""
        try:
            content_id = str(uuid.uuid4())
            document_content = ""
            
            if file_path:
                # Process file content
                source_type = source_type or os.path.splitext(file_path)[1][1:].lower()
                title = title or os.path.basename(file_path)
                
                with open(file_path, 'rb') as file:
                    file_data = file.read()
                    
                if source_type == 'pdf':
                    document_content = self._extract_pdf_content(file_data)
                elif source_type in ['docx', 'doc']:
                    # For demo purposes, assume text
                    document_content = file_data.decode('utf-8', errors='ignore')
                else:
                    # Default to treating as text
                    document_content = file_data.decode('utf-8', errors='ignore')
                
                # Upload to blob storage
                blob_client = self.azure_services.blob_service_client.get_blob_client(
                    container=Config.AZURE_STORAGE_CONTAINER_NAME,
                    blob=f"{content_id}.{source_type}"
                )
                blob_client.upload_blob(file_data)
                
            elif url:
                # Process web content
                source_type = 'web'
                document_content, title = self._extract_web_content(url)
                
            elif text_content:
                # Process direct text input
                source_type = source_type or 'text'
                document_content = text_content
                title = title or f"Note {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}"
            
            # Store metadata in Cosmos DB
            metadata = {
                "id": content_id,
                "title": title,
                "source_type": source_type,
                "created_date": datetime.datetime.now().isoformat(),
                "modified_date": datetime.datetime.now().isoformat(),
                "url": url or ""
            }
            
            container = self.azure_services.cosmos_client.get_database_client(
                Config.COSMOS_DB_DATABASE_NAME
            ).get_container_client(Config.COSMOS_DB_CONTAINER_NAME)
            
            container.create_item(body=metadata)
            
            # Process content into chunks and index in Azure AI Search
            self._process_and_index_content(document_content, metadata)
            
            return {"content_id": content_id, "title": title}
        
        except Exception as e:
            logger.error(f"Error processing document: {str(e)}")
            raise
    
    def _extract_pdf_content(self, file_data):
        """Extract text from PDF documents"""
        try:
            pdf_document = fitz.open(stream=file_data, filetype="pdf")
            text = ""
            
            for page_num in range(pdf_document.page_count):
                page = pdf_document.load_page(page_num)
                text += page.get_text()
            
            return text
        except Exception as e:
            logger.error(f"Error extracting PDF content: {str(e)}")
            return ""
    
    def _extract_web_content(self, url):
        """Extract content from web pages"""
        try:
            response = requests.get(url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            })
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Get title
            title = soup.title.string if soup.title else url
            
            # Extract main content
            # This is a simplified approach - real implementation might be more sophisticated
            article_text = ""
            
            # Try to find main content area
            main_content = soup.find(['article', 'main', 'div', 'body'])
            
            if main_content:
                # Remove script and style elements
                for script_or_style in main_content(['script', 'style']):
                    script_or_style.decompose()
                
                # Get text
                article_text = main_content.get_text(separator='\n')
            else:
                # Fallback to body text
                for script_or_style in soup(['script', 'style']):
                    script_or_style.decompose()
                article_text = soup.get_text(separator='\n')
            
            # Clean up text (remove extra whitespace)
            article_text = re.sub(r'\n+', '\n', article_text)
            article_text = re.sub(r' +', ' ', article_text)
            
            return article_text.strip(), title
        
        except Exception as e:
            logger.error(f"Error extracting web content from {url}: {str(e)}")
            return "", url
    
    def _process_and_index_content(self, content, metadata):
        """Split content into chunks and index in Azure AI Search"""
        try:
            # Clean content
            content = re.sub(r'\s+', ' ', content).strip()
            
            # Split into chunks with overlap
            chunks = []
            for i in range(0, len(content), Config.MAX_CHUNK_SIZE - Config.OVERLAP_SIZE):
                chunk_text = content[i:i + Config.MAX_CHUNK_SIZE]
                if chunk_text:
                    chunks.append(chunk_text)
            
            # Generate embeddings and index chunks
            for i, chunk in enumerate(chunks):
                # Generate embedding
                embedding = self._generate_embedding(chunk)
                
                if embedding:
                    # Create chunk document
                    chunk_doc = {
                        "id": f"{metadata['id']}-chunk-{i}",
                        "content_id": metadata["id"],
                        "source_type": metadata["source_type"],
                        "title": metadata["title"],
                        "url": metadata["url"],
                        "uploaded_date": metadata["created_date"],
                        "chunk_id": str(i),
                        "content": chunk,
                        "content_vector": embedding
                    }
                    
                    # Upload to Azure AI Search
                    self.azure_services.search_client.upload_documents(documents=[chunk_doc])
            
            logger.info(f"Processed and indexed {len(chunks)} chunks for content ID: {metadata['id']}")
        
        except Exception as e:
            logger.error(f"Error processing and indexing content: {str(e)}")
            raise
    
    def _generate_embedding(self, text):
        """Generate embedding vector for a text chunk"""
        try:
            # Use Azure OpenAI to generate embedding
            response = self.azure_services.openai_client.embeddings.create(
                input=text,
                model=Config.AZURE_OPENAI_EMBEDDING_MODEL
            )
            
            return response.data[0].embedding
        
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
            return None

# Knowledge retrieval functionality
class KnowledgeRetriever:
    def __init__(self, azure_services):
        self.azure_services = azure_services
    
    def search_knowledge_base(self, query, top_k=5, filter_criteria=None):
        """Search knowledge base for relevant content based on query"""
        try:
            # Generate embedding for query
            query_embedding = self._generate_embedding(query)
            
            if not query_embedding:
                logger.error("Failed to generate embedding for query")
                return []
            
            # Prepare filter
            filter_string = None
            if filter_criteria:
                filter_parts = []
                
                if 'source_type' in filter_criteria:
                    filter_parts.append(f"source_type eq '{filter_criteria['source_type']}'")
                
                if 'date_from' in filter_criteria and 'date_to' in filter_criteria:
                    filter_parts.append(
                        f"uploaded_date ge {filter_criteria['date_from']} and uploaded_date le {filter_criteria['date_to']}"
                    )
                
                if filter_parts:
                    filter_string = " and ".join(filter_parts)
            
            # Perform vector search
            results = self.azure_services.search_client.search(
                search_text=query,
                vector={"value": query_embedding, "k": top_k, "fields": "content_vector"},
                select=["id", "content_id", "title", "content", "source_type", "url", "uploaded_date"],
                filter=filter_string,
                top=top_k
            )
            
            search_results = []
            for result in results:
                search_results.append({
                    "id": result["id"],
                    "content_id": result["content_id"],
                    "title": result["title"],
                    "content": result["content"],
                    "source_type": result["source_type"],
                    "url": result["url"],
                    "uploaded_date": result["uploaded_date"]
                })
            
            return search_results
        
        except Exception as e:
            logger.error(f"Error searching knowledge base: {str(e)}")
            return []
    
    def _generate_embedding(self, text):
        """Generate embedding vector for a text chunk"""
        try:
            # Use Azure OpenAI to generate embedding
            response = self.azure_services.openai_client.embeddings.create(
                input=text,
                model=Config.AZURE_OPENAI_EMBEDDING_MODEL
            )
            
            return response.data[0].embedding
        
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
            return None
            
    def get_answer(self, query, top_k=5, filter_criteria=None):
        """Get answer to a query based on knowledge base content"""
        try:
            # First, retrieve relevant content
            search_results = self.search_knowledge_base(query, top_k, filter_criteria)
            
            if not search_results:
                return {
                    "answer": "I couldn't find any relevant information in your knowledge base.",
                    "sources": []
                }
            
            # Prepare context for OpenAI
            context = "\n\n".join([f"Title: {result['title']}\nContent: {result['content']}" 
                                 for result in search_results])
            
            # Generate answer using OpenAI
            messages = [
                {"role": "system", "content": "You are a helpful personal assistant that answers questions based on the user's personal knowledge base. Use ONLY the provided context to answer the question. If you don't find the answer in the context, say so honestly. Always cite your sources by mentioning the title of the document where you found the information."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}
            ]
            
            response = self.azure_services.openai_client.chat.completions.create(
                model=Config.AZURE_OPENAI_CHAT_MODEL,
                messages=messages,
                temperature=0.3,
                max_tokens=1000
            )
            
            answer = response.choices[0].message.content
            
            # Prepare sources for citation
            sources = []
            for result in search_results:
                sources.append({
                    "title": result["title"],
                    "source_type": result["source_type"],
                    "url": result["url"] if result["url"] else None
                })
            
            return {
                "answer": answer,
                "sources": sources
            }
            
        except Exception as e:
            logger.error(f"Error getting answer: {str(e)}")
            return {
                "answer": "Sorry, I encountered an error while trying to answer your question.",
                "sources": []
            }

# Learning tools functionality
class LearningTools:
    def __init__(self, azure_services, knowledge_retriever):
        self.azure_services = azure_services
        self.knowledge_retriever = knowledge_retriever
    
    def generate_flashcards(self, topic, count=None):
        """Generate flashcards for a specific topic"""
        try:
            count = count or Config.FLASHCARD_COUNT
            
            # First, retrieve relevant content
            search_results = self.knowledge_retriever.search_knowledge_base(topic, top_k=3)
            
            if not search_results:
                return []
            
            # Prepare context
            context = "\n\n".join([f"Title: {result['title']}\nContent: {result['content']}" 
                                 for result in search_results])
            
            # Generate flashcards using OpenAI
            messages = [
                {"role": "system", "content": f"You are a helpful assistant that creates flashcards to help users learn. Based on the provided context, create {count} flashcards in a question-answer format about the topic. Make sure the flashcards cover key concepts and important details."},
                {"role": "user", "content": f"Context:\n{context}\n\nTopic: {topic}\nCreate {count} flashcards."}
            ]
            
            response = self.azure_services.openai_client.chat.completions.create(
                model=Config.AZURE_OPENAI_CHAT_MODEL,
                messages=messages,
                temperature=0.5,
                max_tokens=1000
            )
            
            flashcards_text = response.choices[0].message.content
            
            # Parse flashcards
            flashcards = []
            pattern = r"(?:Flashcard\s*\d+:?\s*)?Q(?:uestion)?:?\s*(.*?)\s*A(?:nswer)?:?\s*(.*?)(?=(?:\n\s*(?:Flashcard\s*\d+:?\s*)?Q(?:uestion)?:)|$)"
            matches = re.finditer(pattern, flashcards_text, re.DOTALL)
            
            for match in matches:
                question = match.group(1).strip()
                answer = match.group(2).strip()
                if question and answer:
                    flashcards.append({
                        "question": question,
                        "answer": answer
                    })
            
            return flashcards
            
        except Exception as e:
            logger.error(f"Error generating flashcards: {str(e)}")
            return []
    
    def generate_summary(self, topic):
        """Generate a summary for a specific topic"""
        try:
            # First, retrieve relevant content
            search_results = self.knowledge_retriever.search_knowledge_base(topic, top_k=5)
            
            if not search_results:
                return "I couldn't find any relevant information to summarize."
            
            # Prepare context
            context = "\n\n".join([f"Title: {result['title']}\nContent: {result['content']}" 
                                 for result in search_results])
            
            # Generate summary using OpenAI
            messages = [
                {"role": "system", "content": "You are a helpful assistant that creates concise summaries based on the provided context. Create a well-structured summary that captures the main points and key details."},
                {"role": "user", "content": f"Context:\n{context}\n\nCreate a summary about: {topic}"}
            ]
            
            response = self.azure_services.openai_client.chat.completions.create(
                model=Config.AZURE_OPENAI_CHAT_MODEL,
                messages=messages,
                temperature=0.3,
                max_tokens=1000
            )
            
            summary = response.choices[0].message.content
            return summary
            
        except Exception as e:
            logger.error(f"Error generating summary: {str(e)}")
            return "Sorry, I encountered an error while trying to generate a summary."
    
    def generate_quiz(self, topic, question_count=5):
        """Generate a quiz for a specific topic"""
        try:
            # First, retrieve relevant content
            search_results = self.knowledge_retriever.search_knowledge_base(topic, top_k=3)
            
            if not search_results:
                return []
            
            # Prepare context
            context = "\n\n".join([f"Title: {result['title']}\nContent: {result['content']}" 
                                 for result in search_results])
            
            # Generate quiz using OpenAI
            messages = [
                {"role": "system", "content": f"You are a helpful assistant that creates quizzes to help users learn. Based on the provided context, create {question_count} quiz questions in a multiple-choice format about the topic. Include 4 options for each question and indicate the correct answer."},
                {"role": "user", "content": f"Context:\n{context}\n\nTopic: {topic}\nCreate {question_count} multiple-choice questions."}
            ]
            
            response = self.azure_services.openai_client.chat.completions.create(
                model=Config.AZURE_OPENAI_CHAT_MODEL,
                messages=messages,
                temperature=0.5,
                max_tokens=1500
            )
            
            quiz_text = response.choices[0].message.content
            
            # Parse quiz questions
            quiz = []
            pattern = r"(?:Question\s*(\d+):?\s*)(.*?)(?:\n(?:Options|Choices):?\s*\n)((?:(?:[A-D]\.?\s*.*?\n){4}))(?:(?:Correct Answer|Answer):?\s*([A-D]))"
            matches = re.finditer(pattern, quiz_text, re.DOTALL)
            
            for match in matches:
                question_num = match.group(1)
                question_text = match.group(2).strip()
                options_text = match.group(3).strip()
                correct_answer = match.group(4).strip()
                
                # Parse options
                options = {}
                option_pattern = r"([A-D])\.?\s*(.*?)(?=\n[A-D]\.|\Z)"
                option_matches = re.finditer(option_pattern, options_text + "\n", re.DOTALL)
                
                for option_match in option_matches:
                    option_letter = option_match.group(1)
                    option_content = option_match.group(2).strip()
                    options[option_letter] = option_content
                
                quiz.append({
                    "question_number": question_num,
                    "question": question_text,
                    "options": options,
                    "correct_answer": correct_answer
                })
            
            return quiz
            
        except Exception as e:
            logger.error(f"Error generating quiz: {str(e)}")
            return []

# Initialize services
azure_services = AzureServices()
document_processor = DocumentProcessor(azure_services)
knowledge_retriever = KnowledgeRetriever(azure_services)
learning_tools = LearningTools(azure_services, knowledge_retriever)

# API endpoints
@app.route('/')
def index():
    """Main page"""
    return render_template('index.html')

@app.route('/api/upload', methods=['POST'])
def upload_document():
    """Upload a document to the knowledge base"""
    try:
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({"error": "No file selected"}), 400
            
            # Save file temporarily
            temp_file_path = f"/tmp/{file.filename}"
            file.save(temp_file_path)
            
            # Process document
            result = document_processor.process_document(
                file_path=temp_file_path,
                title=request.form.get('title', file.filename)
            )
            
            # Clean up
            os.remove(temp_file_path)
            
            return jsonify(result)
        
        elif 'url' in request.json:
            url = request.json['url']
            # Process URL
            result = document_processor.process_document(
                url=url,
                title=request.json.get('title')
            )
            return jsonify(result)
        
        elif 'text' in request.json:
            text = request.json['text']
            # Process text
            result = document_processor.process_document(
                text_content=text,
                title=request.json.get('title'),
                source_type='note'
            )
            return jsonify(result)
        
        else:
            return jsonify({"error": "No content provided"}), 400
    
    except Exception as e:
        logger.error(f"Error in upload_document: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/ask', methods=['POST'])
def ask_question():
    """Ask a question to the knowledge base"""
    try:
        query = request.json.get('query')
        if not query:
            return jsonify({"error": "No question provided"}), 400
        
        filter_criteria = request.json.get('filter')
        
        # Get answer
        result = knowledge_retriever.get_answer(query, filter_criteria=filter_criteria)
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in ask_question: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/flashcards', methods=['POST'])
def create_flashcards():
    """Create flashcards for a topic"""
    try:
        topic = request.json.get('topic')
        count = request.json.get('count', Config.FLASHCARD_COUNT)
        
        if not topic:
            return jsonify({"error": "No topic provided"}), 400
        
        # Generate flashcards
        flashcards = learning_tools.generate_flashcards(topic, count)
        return jsonify({"flashcards": flashcards})
    
    except Exception as e:
        logger.error(f"Error in create_flashcards: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/summary', methods=['POST'])
def create_summary():
    """Create a summary for a topic"""
    try:
        topic = request.json.get('topic')
        
        if not topic:
            return jsonify({"error": "No topic provided"}), 400
        
        # Generate summary
        summary = learning_tools.generate_summary(topic)
        return jsonify({"summary": summary})
    
    except Exception as e:
        logger.error(f"Error in create_summary: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/quiz', methods=['POST'])
def create_quiz():
    """Create a quiz for a topic"""
    try:
        topic = request.json.get('topic')
        question_count = request.json.get('question_count', 5)
        
        if not topic:
            return jsonify