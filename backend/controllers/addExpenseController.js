const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModal");

// @desc Add a new expense
// @route POST /api/expense/add
// @access Private
const addExpense = asyncHandler(async (req, res) => {
  const { expended_on, category, amount, date, payment_method, note } = req.body;

  if (!expended_on || !category || !amount || !date || !payment_method) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const expense = await Expense.create({
    user: req.user.id,
    expended_on,
    category,
    amount,
    date,
    payment_method,
    note,
  });

  if (expense) {
    res.status(201).json({
      _id: expense._id,
      user: expense.user,
      expended_on: expense.expended_on,
      category: category,
      amount: expense.amount,
      date: expense.date,
      payment_method: expense.payment_method,
      note: expense.note,
    });
  } else {
    res.status(400);
    throw new Error("Invalid expense data");
  }
});

// @desc Get all expenses for a user
// @route GET /api/expense
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
});

module.exports = { addExpense, getExpenses };
