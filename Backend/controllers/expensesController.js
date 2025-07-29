const Expense = require('../models/Expense1');
const mongoose = require('mongoose');

// CREATE a single expense
const createExpense = async (req, res) => {
  const { description, amount, paidBy } = req.body;

  let emptyFields = []

  if (!description){
    emptyFields.push('description')
  }
  if (!amount){
    emptyFields.push('amount')
  }
  if (!paidBy){
    emptyFields.push('paidBy')
  }
  if (emptyFields.length > 0){
    return res.status(400).json({error:'Please fill in all the feilds',emptyFields})
  }
  
  try {
    // Validation
    if (!description || !amount || !paidBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the expense
    const expense = await Expense.create({
      description,
      amount,
      paidBy,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error.message);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// GET all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({}).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// GET a single expense by ID
const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' });
  }

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ error: 'No such expense' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

// DELETE an expense by ID
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' });
  }

  try {
    const expense = await Expense.findOneAndDelete({ _id: id });

    if (!expense) {
      return res.status(404).json({ error: 'No such expense' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// UPDATE an expense by ID
const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' });
  }

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Return the updated document
    );

    if (!expense) {
      return res.status(404).json({ error: 'No such expense' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
};
