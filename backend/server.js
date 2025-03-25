require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const { errorHandler } = require("./middleware/errorHandler");
const { validateToken } = require("./middleware/validateTokenHandler");

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/expense", validateToken, require("./routes/addExpenseRoute"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
