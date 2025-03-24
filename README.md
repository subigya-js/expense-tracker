# @expense-tracker

@expense-tracker is a full-stack web application for managing personal finances and tracking expenses. It provides users with a simple and intuitive interface to record, categorize, and analyze their spending habits.

## Features

- User authentication (register, login, logout)
- Dashboard with expense overview
- Add, edit, and delete expenses
- Categorize expenses
- Filter and sort expenses
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Project Structure

```
expense-tracker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

## Prerequisites

- Node.js (v18.17.0 or later)
- npm (v9.6.7 or later)
- MongoDB (v5.0 or later)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/subigya-js/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables (see [Configuration](#configuration) section)

## Configuration

### Backend

Create a `.env` file in the `backend/` directory with the following variables:

```
PORT=3001
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string for JWT signing.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.
