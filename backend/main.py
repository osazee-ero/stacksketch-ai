from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(
    title="StackSketch AI API",
    description="Backend API for generating tech stack blueprints from project ideas.",
    version="0.1.0",
)


# CORS allows the frontend to communicate with the backend.
# During development, the frontend runs on http://localhost:3000
# and the backend runs on http://localhost:8000.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IdeaRequest(BaseModel):
    idea: str


@app.get("/")
def root():
    return {
        "message": "Welcome to the StackSketch AI backend."
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "StackSketch AI API"
    }


@app.post("/api/blueprints/generate")
def generate_blueprint(request: IdeaRequest):
    

    return {
        "project_name": "Generated Project Blueprint",
        "user_idea": request.idea,
        "summary": "This is a starter blueprint generated from the user's idea.",
        "tech_stack": [
            {
                "name": "Next.js",
                "category": "Frontend",
                "purpose": "Builds the user interface where users enter their project ideas."
            },
            {
                "name": "FastAPI",
                "category": "Backend",
                "purpose": "Receives requests from the frontend and handles business logic."
            },
            {
                "name": "PostgreSQL",
                "category": "Database",
                "purpose": "Stores users, projects, generated blueprints, and history."
            },
            {
                "name": "OpenAI API",
                "category": "AI Layer",
                "purpose": "Generates project summaries, tech stack suggestions, and architecture explanations."
            }
        ],
        "connections": [
            "The user enters a project idea in the Next.js frontend.",
            "The frontend sends the idea to the FastAPI backend.",
            "The backend sends the idea to the AI service.",
            "The AI service returns a structured project blueprint.",
            "The backend sends the blueprint back to the frontend.",
            "The frontend displays the tech stack and architecture explanation."
        ],
        "diagram": "flowchart TD\nA[User Idea] --> B[Next.js Frontend]\nB --> C[FastAPI Backend]\nC --> D[AI Service]\nC --> E[PostgreSQL Database]\nD --> F[Generated Blueprint]\nF --> B"
    }