const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema(
  {
    month: {
      type: String, // Format: "2025-07"
      required: true,
      match: /^\d{4}-\d{2}$/, // Basic format validation
    },
    limit: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', BudgetSchema);
