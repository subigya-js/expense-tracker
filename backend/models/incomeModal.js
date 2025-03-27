const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: [true, "Please add the income amount."],
      min: [1, "Amount must be at least 1."],
    },
    category: {
      type: String,
      required: [true, "Please add the income category."],
    },
    date: {
      type: String,
      required: [true, "Please add the income date."],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);
