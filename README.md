# TailorMake

AI-powered resume tailoring and workshop assistant.

## Installation & Local Development Setup

This guide explains how to run both the frontend and backend locally for development.

---

## Frontend Setup

### 1. Clone the repository

```bash
git clone https://github.com/SwastikPurathepparambil/tailormake
cd tailormake
```

### 2. Install Node.js (LTS recommended)

If using `nvm`:

```bash
nvm install --lts
nvm use --lts
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Create and configure environment variables

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Add the required variables:

```bash
# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com

# Backend API URL
VITE_BACKEND_URL=http://localhost:8000
```

#### How to obtain `VITE_GOOGLE_CLIENT_ID`

You must create an OAuth 2.0 Client ID in the Google Cloud Console.  
A detailed set of instructions to create the appropriate OAuth can be found here:

https://www.youtube.com/watch?v=GuHN_ZqHExs

Typical local redirect URI:

```text
http://localhost:5173
```

### 5. Start the frontend dev server

```bash
npm run dev
```

You should see something like:

```text
VITE v7.2.2  ready in 145 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  Press h + enter to show help
```

Open the app in your browser:

```text
http://localhost:5173
```

---

## Backend Setup (IMPORTANT)

THE BACKEND LIVES IN A SEPARATE REPO.

```text
https://github.com/SwastikPurathepparambil/tmserver
```

Do NOT follow the instructions in that repo, use the instructions below.

### 1. Python Requirements

The backend requires:

```text
Python >= 3.10 and < 3.14
```

Check your version:

```bash
python3 --version
```

### 2. Install `uv` (Python environment manager)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Verify installation:

```bash
uv --version
```

### 3. Install backend dependencies

From the backend root directory (of the `tmserver` repo):

```bash
uv sync
```

This installs all dependencies from `pyproject.toml`, including:

- FastAPI  
- Uvicorn  
- Pydantic  
- MongoDB driver  
- CrewAI  

### 4. Add environment variables

Create a `.env` file in the backend root:

```bash
touch .env
```

Add:

```bash
MODEL=<model-name>
OPENAI_API_KEY=<your-openai-key>
MONGO_URI=<your-mongo-uri>
SERPER_API_KEY=<your-serper-api-key>
```

These are required for the AI pipelines and database integration.

### 5. Start the backend server

Navigate to the backend source folder:

```bash
cd src/tmserver
```

Run the server:

```bash
uv run api.py
```

Expected output:

```text
Built tmserver @ file:///path/to/tmserver
Uninstalled 1 package in 1ms
Installed 1 package in 3ms
INFO:     Started server process [19991]
INFO:     Waiting for application startup.
Connected to Mongo!
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Diagram 1: Component Diagram
![Untitled (Draft)-1](https://github.com/user-attachments/assets/b10aee8b-1634-4f96-973f-7568b1dd7033)

