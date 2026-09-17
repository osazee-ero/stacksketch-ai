# StackSketch AI

**An early full-stack prototype for turning a project idea into an architecture blueprint.**

**Current status: UI/API scaffold with a fixed example response.** The backend echoes the user's idea but returns the same sample stack and connections. No LLM or database is connected yet.

## Implemented

- Next.js interface for entering an idea, submitting it, and displaying a response.
- FastAPI `POST /api/blueprints/generate` endpoint with a typed request body.
- Technology cards, connection explanations, and Mermaid source shown as text.
- Loading/error states and a health endpoint at `/api/health`.

## Current request flow

```text
Project idea -> Next.js form -> FastAPI -> fixed blueprint JSON -> rendered cards
```

The sample blueprint mentions PostgreSQL and an AI service as proposed components. Those services are not implemented dependencies of this version. The diagram is not rendered visually yet.

## Run locally

Prerequisites: Python, Node.js compatible with the Next.js version in `frontend/package.json`, and npm. No AI API key is required for the current scaffold.

```bash
git clone https://github.com/osazee-ero/stacksketch-ai.git
cd stacksketch-ai/backend
python -m venv .venv
```

Activate with `source .venv/bin/activate` on macOS/Linux or `.venv\Scripts\Activate.ps1` in PowerShell, then:

```bash
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

In another terminal, from `frontend`:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The frontend currently calls `http://localhost:8000` directly. The variables in the root `.env.example` are placeholders; the current request path does not read them.

## Next milestones

- Add model-backed blueprint generation and validate its output schema.
- Render the returned diagram.
- Replace the fixed API URL with environment configuration.
- Add persistence and export only after generation works reliably.
- Evaluate suggestions against explicit project constraints.

This repository demonstrates an initial frontend/backend integration, not a finished AI planning product.
