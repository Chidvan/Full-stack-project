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
  }
});

module.exports = mongoose.model('Expense1', ExpenseSchema);
