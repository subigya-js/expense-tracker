const express = require("express");
const {
 registerUser,
 loginUser,
 currentUser,
} = require("../controllers/userControllers");
const router = express.Router();

router
 .post("/register", registerUser)
 .post("/login", loginUser)
 .get("/current", currentUser);

module.exports = router;