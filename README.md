# Tailormake

## Installation + Setup

### Frontend

git clone https://github.com/SwastikPurathepparambil/tailormake
cd tailormake
first: nvm install --lts

npm install

Configure the ENV:

VITE_GOOGLE_CLIENT_ID=<>.apps.googleusercontent.com

To create VITE_GOOGLE_CLIENT_ID, you have to create a google oauth ID setup in the Google Console. Follow <some_link_to_add_here>

VITE_BACKEND_URL=http://localhost:8000 

then finally run: npm run dev

Should see:

> tailormake@0.0.0 dev
> vite


  VITE v7.2.2  ready in 145 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help


### Backend (VERY IMPORTANT NOTE HERE)

The backend is at another URL: https://github.com/SwastikPurathepparambil/tmserver

Don't look at any of the instructions there.

Ensure you have Python >=3.10 <3.14 installed on your system. This project uses UV for dependency management and package handling, offering a seamless setup and execution experience.

to set it up, make sure you have uv package installer. Use:

curl -LsSf https://astral.sh/uv/install.sh | sh

then do a uv sync at the root directory

then create a .env file:

touch .env

inside, add in env vars:
MODEL=<model>
OPENAI_API_KEY=<key>
MONGO_URI=<MONGO_URI>
SERPER_API_KEY=<SERPER_API_KEY>

Then, go into the /src/tmserver folder and call uv run api.py


Built tmserver @ file:///Users/swastik/Desktop/tmserver
Uninstalled 1 package in 1ms
Installed 1 package in 3ms
INFO:     Started server process [19991]
INFO:     Waiting for application startup.
Connected to Mongo!
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)