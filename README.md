# @expense-tracker

@expense-tracker is a full-stack web application for managing personal finances and tracking expenses. It provides users with a simple and intuitive interface to record, categorize, and analyze their spending habits.

## Features

- User authentication (register, login, logout)
- Dashboard with income, expense and balance amount overview
- Add and filter incomes and expenses
- Categorize expenses
- Filter and sort transactions
- Interactive bar graph visualization of monthly income and expenses
- Real-time income, expense and balance amount calculation
- Download transactions in Excel format

## Tech Stack

### Frontend
- Next.js 13+ (React framework) with App Router
- TypeScript
- Tailwind CSS for styling
- shadcn/ui components for UI elements
- Recharts for data visualization
- ESLint for code linting
- Lucide React for icons

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
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── modals/
│   │   │   │   └── overview/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── transactions/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── lib/
│   │   └── api/
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
- Git

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/subigya-js/expense-tracker.git
   ```

   ```
   cd expense-tracker
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   ```

   ```
   cd backend && npm install
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

### Frontend

Create a `.env.local` file in the `frontend/` directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   ```
   ```
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   ```

   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.
