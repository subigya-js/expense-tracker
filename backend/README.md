# Expense Tracker Backend

This is the backend server for the Expense Tracker application. It provides API endpoints for user authentication, income management, and expense management.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variable management

## Setup

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root of the backend directory (see [Environment Variables](#environment-variables))
5. Start the server: `npm run dev` (for development) or `npm start` (for production)

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
PORT=3001
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string for JWT signing.

## API Endpoints

### Authentication
- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Login a user
- GET `/api/auth/current`: Get current user info (protected route)

### Income Management
- POST `/api/income/`: Add a new income entry
- GET `/api/income/`: Get all income entries for the current user

### Expense Management
- POST `/api/expense/`: Add a new expense entry
- GET `/api/expense/`: Get all expense entries for the current user

## Middleware

- `errorHandler`: Global error handling middleware
- `validateToken`: JWT validation middleware for protected routes

## Database Models

- `userModel`: Defines the schema for user data
- `incomeModel`: Defines the schema for income entries
- `expenseModel`: Defines the schema for expense entries

## Controllers

- `userControllers`: Handles user authentication logic
- `incomeController`: Manages income-related operations
- `expenseController`: Manages expense-related operations
- `transactionController`: Handles transaction download functionality

## Database

This project uses MongoDB as the database. The connection is established in `config/connectDB.js`. Make sure to provide the correct MongoDB connection string in your `.env` file.

## Error Handling

Custom error handling is implemented in `middleware/errorHandler.js`. This provides consistent error responses across the API.

## Running the Server

- For development: `npm run dev` (uses nodemon for auto-reloading)
- For production: `npm start`

The server will start on the port specified in your `.env` file (defaults to 3001 if not specified).

## Testing

To run the test suite:

```
npm test
```

This will execute the test cases defined in the `__tests__` directory.
