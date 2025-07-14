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
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  settled: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('Expense1', ExpenseSchema);
