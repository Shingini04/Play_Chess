
# Chess Platform – Web-Based Real-Time Chess Application

## What This App Does

This is a complete chess platform that allows users to:

* Sign up and authenticate using Google, GitHub, or as a guest
* Create new matches or get automatically matched with other players
* Play chess games in real-time with a beautiful, interactive chess board
* View game history and replay moves

## Tech Stack Used

### Frontend

* React – Main UI framework
* TypeScript – Type-safe JavaScript
* Vite – Fast build tool and development server
* Tailwind CSS – Utility-first CSS framework
* Recoil – State management
* React Router – Client-side routing
* Chess.js – Chess game logic and validation

### Backend

* Node.js – Server runtime
* Express.js – Web framework
* TypeScript – Type-safe JavaScript
* Passport.js – Authentication middleware
* JWT – JSON Web Tokens for authentication
* Cookie-based sessions – Session management

### Database

* PostgreSQL – Main database
* Prisma – Database ORM and query builder

### Real-time Features

* WebSockets (ws) – Real-time game communication
* Custom WebSocket server – Handles game moves and matchmaking

### Development Tools

* Turborepo – Monorepo build system
* ESLint – Code linting
* Prettier – Code formatting
* Husky – Git hooks

## Folder Structure

```
chess-monorepo/
├── apps/
│   ├── frontend/          # React web application
│   ├── backend/           # Express.js API server
│   ├── ws/                # WebSocket server for real-time games
├── packages/
│   ├── db/                # Prisma database schema and client
│   ├── store/             # Shared state management (Recoil atoms)
│   ├── ui/                # Shared UI components
│   └── eslint-config/     # Shared ESLint configurations
└── README.md
```

## How the App Works

### User Authentication

* Users can sign up using Google OAuth, GitHub OAuth, or as a guest
* Authentication is handled by the backend using Passport.js
* JWT tokens are issued and stored in cookies for session management
* Guest users get temporary accounts that work for the session

### Game Flow

**Starting a Game:**

* User clicks "Play" on the frontend
* Frontend sends a WebSocket message to start matchmaking
* WebSocket server either creates a new game or matches with a waiting player

**Real-time Gameplay:**

* Chess board is rendered using a custom React component
* When a player makes a move, it's validated using Chess.js
* Move is sent via WebSocket to the game server
* Server validates and broadcasts the move to both players
* Database stores each move with timestamps

**Game Completion:**

* Game ends when checkmate, stalemate, or resignation occurs

### Data Flow

* Frontend ↔ Backend API – User authentication, game history
* Frontend ↔ WebSocket Server – Real-time game moves, matchmaking
* Backend/WebSocket Server ↔ PostgreSQL – User data, game records, moves
* Shared packages used across all modules for consistency

### Real-time Features

* WebSocket connections handle live game communication
* Move validation occurs on both client and server
* Game state is synchronized between both players
* Automatic reconnection support if connection drops

## Setup Instructions

### Prerequisites

* Node.js (v18 or higher)
* PostgreSQL
* Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chess-monorepo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create `.env` files in the following locations:

**/apps/backend/.env**

```
DATABASE_URL="postgresql://username:password@localhost:5432/chess_db"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

JWT_SECRET="your_super_secret_jwt_key"
COOKIE_SECRET="your_cookie_secret_key"

PORT=3000
ALLOWED_HOSTS="http://localhost:5173,http://localhost:3000"
AUTH_REDIRECT_URL="http://localhost:5173/game/random"
```

**/apps/frontend/.env**

```
VITE_APP_BACKEND_URL="http://localhost:3000"
VITE_APP_WS_URL="ws://localhost:8080"
```

**/apps/ws/.env**

```
DATABASE_URL="postgresql://username:password@localhost:5432/chess_db"
JWT_SECRET="your_super_secret_jwt_key"
```

**/packages/db/.env**

```
DATABASE_URL="postgresql://username:password@localhost:5432/chess_db"
```

### 4. Set Up the Database

```bash
cd packages/db
npm run db:generate
npm run db:push
```

### 5. Start the Development Servers

Use three separate terminal windows:

**Terminal 1 - WebSocket Server**

```bash
cd apps/ws
npm run dev
```

**Terminal 2 - Backend API**

```bash
cd apps/backend
npm run dev
```

**Terminal 3 - Frontend**

```bash
cd apps/frontend
npm run dev
```

### 6. Access the Application

* Web App: [http://localhost:5173](http://localhost:5173)
* API Server: [http://localhost:3000](http://localhost:3000)
* WebSocket Server: ws\://localhost:8080

## Environment Variables Summary

### Backend (`/apps/backend/.env`)

* `DATABASE_URL`
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `GITHUB_CLIENT_ID`
* `GITHUB_CLIENT_SECRET`
* `JWT_SECRET`
* `COOKIE_SECRET`
* `PORT`
* `ALLOWED_HOSTS`
* `AUTH_REDIRECT_URL`

### Frontend (`/apps/frontend/.env`)

* `VITE_APP_BACKEND_URL`
* `VITE_APP_WS_URL`

### WebSocket Server (`/apps/ws/.env`)

* `DATABASE_URL`
* `JWT_SECRET`

### Database (`/packages/db/.env`)

* `DATABASE_URL`

## Getting OAuth Credentials

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/auth/google/callback` to authorized redirect URIs

### GitHub OAuth

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/auth/github/callback`

## Troubleshooting

* **Database issues**: Ensure PostgreSQL is running and `DATABASE_URL` is correct
* **OAuth errors**: Double-check credentials and redirect URLs
* **WebSocket connection fails**: Confirm WebSocket server is running on port 8080
* **Port conflicts**: Update `PORT` values if necessary
