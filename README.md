# TailorMake

AI-powered resume tailoring and workshop assistant.

---

## 🚀 Installation & Local Development Setup

This guide explains how to run both the frontend and backend locally for development.

---

## 🔹 Frontend Setup

### 1. Clone the repository

```bash
git clone https://github.com/SwastikPurathepparambil/tailormake
cd tailormake
2. Install Node.js (LTS recommended)
If using nvm:

bash
Copy code
nvm install --lts
nvm use --lts
3. Install frontend dependencies
bash
Copy code
npm install
4. Create and configure environment variables
Create a .env.local file:

bash
Copy code
touch .env.local
Add the required variables:

bash
Copy code
# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com

# Backend API URL
VITE_BACKEND_URL=http://localhost:8000
📌 How to obtain VITE_GOOGLE_CLIENT_ID
You must create an OAuth 2.0 Client ID in the Google Cloud Console.
More instructions can be added here:

👉 <insert_link_here>

Local redirect URI typically:

text
Copy code
http://localhost:5173
5. Start the frontend dev server
bash
Copy code
npm run dev
You should see:

text
Copy code
VITE v7.2.2  ready in 145 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  Press h + enter to show help
Open:

👉 http://localhost:5173

🔹 Backend Setup
⚠️ IMPORTANT:
The backend lives in a separate repository:
👉 https://github.com/SwastikPurathepparambil/tmserver

Do NOT follow the instructions in that repo — use the instructions below instead.

1. Python Requirements
The backend requires:

text
Copy code
Python >= 3.10 and < 3.14
Check your version:

bash
Copy code
python3 --version
2. Install uv (Python environment manager)
bash
Copy code
curl -LsSf https://astral.sh/uv/install.sh | sh
Verify:

bash
Copy code
uv --version
3. Install backend dependencies
In the backend root directory:

bash
Copy code
uv sync
This installs all dependencies from pyproject.toml, including:

FastAPI

Uvicorn

Pydantic

MongoDB driver

CrewAI

4. Add environment variables
Create a .env file:

bash
Copy code
touch .env
Add:

bash
Copy code
MODEL=<model-name>
OPENAI_API_KEY=<your-openai-key>
MONGO_URI=<your-mongo-uri>
SERPER_API_KEY=<your-serper-api-key>
These are required for the AI pipelines and database integration.

5. Start the backend server
Navigate to:

bash
Copy code
cd src/tmserver
Run the server:

bash
Copy code
uv run api.py
Expected output:

text
Copy code
Built tmserver @ file:///path/to/tmserver
Uninstalled 1 package in 1ms
Installed 1 package in 3ms
INFO:     Started server process [19991]
INFO:     Waiting for application startup.
Connected to Mongo!
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
