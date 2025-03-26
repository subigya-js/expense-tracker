const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: String,
      required: [true, "Please add the income amount."],
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
