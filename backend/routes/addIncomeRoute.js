const express = require("express");
const { addIncome, getIncomes } = require("../controllers/addIncomeController");
const router = express.Router();

router.post("/add", addIncome);
router.get("/", getIncomes);

module.exports = router;
