const express = require('express');
const {
  createExpense,
  getExpense,
  getExpenses
} = require('../controllers/expensesController')
const router = express.Router();


// GET all expenses
router.get('/', getExpenses);

// GET a single expense
router.get('/:id', getExpense);

// POST a new expense
router.post('/', createExpense)

// DELETE an expense
router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE an expense' });
});

// PATCH (update) an expense
router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE the expense' });
});

module.exports = router;
