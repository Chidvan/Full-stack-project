const Expense = require('../models/Expense1');
const mongoose = require('mongoose');
const Budget = require('../models/Budget');

// CREATE a single expense
const createExpense = async (req, res) => {
  const { description, amount, paidBy, category } = req.body;

  let emptyFields = [];
  if (!description) emptyFields.push("description");
  if (!amount) emptyFields.push("amount");
  if (!paidBy) emptyFields.push("paidBy");
  if (!category) emptyFields.push("category");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  try {
    // Get current year and month in format "YYYY-MM"
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Look for budget for this month
    const existingBudget = await Budget.findOne({ month });

    if (existingBudget) {
      // Calculate total expenses for the current month
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      const monthlyTotal = await Expense.aggregate([
        {
          $match: {
            createdAt: { $gte: monthStart, $lte: monthEnd },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const totalSoFar = monthlyTotal[0]?.total || 0;

      if (totalSoFar + amount > existingBudget.limit) {
        return res.status(400).json({ error: "❌ Budget exceeded for this month" });
      }
    }

    // Create expense
    const expense = await Expense.create({
      description,
      amount,
      paidBy,
      category,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({ error: "Failed to create expense" });
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

// GET a single expense
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

// DELETE an expense
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

// UPDATE an expense
const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' });
  }

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'No such expense' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// FILTER expenses by category and/or month
const filterExpenses = async (req, res) => {
  const { category, month } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (month) {
    // Format: YYYY-MM
    const [year, monthNum] = month.split("-");
    const start = new Date(year, parseInt(monthNum) - 1, 1);
    const end = new Date(year, parseInt(monthNum), 0, 23, 59, 59);
    filter.createdAt = { $gte: start, $lte: end };
  }

  try {
    const expenses = await Expense.find(filter).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter expenses' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
  filterExpenses,
};
