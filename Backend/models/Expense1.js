const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  paidBy: { 
    type: String, 
    required: true 
  },
  category: {
  type: String,
  required: true,
  enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Shopping', 'Other'],
  }
}, { timestamps: true }); // enables createdAt and updatedAt automatically

module.exports = mongoose.model('Expense1', ExpenseSchema);
