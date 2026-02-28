## Tech Stack

| | Technology | |
|---|---|---|
| Frontend | React + Vite | Fast dev server, modern JSX, great DX |
| Styling | SCSS | Variables, nesting, modular files |
| SQL Editor | Monaco Editor | Same editor as VS Code, syntax highlighting |
| Backend | Node.js + Express | Lightweight REST API |
| Database (store) | MongoDB + Mongoose | Flexible schema for storing assignments |
| Database (execution) | PostgreSQL | Real SQL engine to run and grade user queries |
| pg library | import pkg from "pg" | direct import { Pool } from "pg" won't work with ES Modules |
| Pool over Client | handles multiple connections at once | multiple users can run queries simultaneously without waiting |
| client.release() | returns the connection back to the pool | keeps the pool healthy |


## Prerequisites

- [Node.js] v18+
- [MongoDB] running locally or a Atlas URI
- [PostgreSQL] running locally


## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ravi-Pr4kash/CipherSqlStudio
cd CipherSqlStudio
```

### 2. Backend setup

```bash
cd backend
npm i
```

Copy the env.example file and fill in your values:


Edit `.env` with your credentials (Environment Variables section is below).

Seed the database with questions:

```bash
node src/seed/seed.js
```

Start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:3000`

---

### 3. Frontend setup

```bash
cd frontend
npm i
```

Copy the example env file:



Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

### Backend — `backend/.env`

```bash
# Server
PORT=3000

# MongoDB 
MONGO_URI=mongodb://localhost:27017/ciphersqlstudio

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_username
PG_PASSWORD=your_postgres_password 
PG_DATABASE=your_postgres_database

```

### Frontend — `frontend/.env`

```bash
# URL of the backend API
# In development: http://localhost:3000
# In production: replace with your deployed backend URL
VITE_API_URL=http://localhost:3000
```


## API Endpoints



GET: `/api/v1/assignments` --> Fetch all assignments.
POST: `/api/v1/run` --> Execute and grade a SQL query. 





