const express = require('express');
const {
  createExpense,
  getExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  filterExpenses
} = require('../controllers/expensesController')
const router = express.Router();

// GET expenses with filters
router.get('/filter', filterExpenses);

// GET all expenses
router.get('/', getExpenses);

// GET a single expense
router.get('/:id', getExpense);

// POST a new expense
router.post('/', createExpense)

// DELETE an expense
router.delete('/:id', deleteExpense);

// PATCH (update) an expense
router.patch('/:id',updateExpense);

module.exports = router;
