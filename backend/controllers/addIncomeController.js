const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModal");

// @desc Add a new Income
// @route POST /api/income/add
// @access Private
const addIncome = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category || !date) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const income = await Income.create({
    user: req.user.id,
    amount,
    category,
    date,
    description,
  });

  if (income) {
    res.status(201).json({
      _id: income._id,
      user: income.user,
      amount: income.amount,
      category: income.category,
      date: income.date,
      description: income.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid income data");
  }
});

// @desc Get all incomes for a user
// @route GET /api/income
// @access Private
const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({ user: req.user.id });
  res.json(incomes);
});

module.exports = { addIncome, getIncomes };
