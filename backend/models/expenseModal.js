const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    expended_on: {
      type: String,
      required: [true, "Please add the expense name."],
    },
    amount: {
      type: String,
      required: [true, "Please add the expense amount."],
    },
    date: {
      type: String,
      required: [true, "Please add the expense date."],
    },
    payment_method: {
      type: String,
      required: [true, "Please add the payment method."],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
