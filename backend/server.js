require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
