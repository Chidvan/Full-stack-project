const Budget = require("../models/Budget");

// POST /api/budgets
const setBudget = async (req, res) => {
  const { month, limit } = req.body;

  if (!month || !limit) {
    return res.status(400).json({ error: "Month and limit are required" });
  }

  try {
    let budget = await Budget.findOne({ month });

    if (budget) {
      // Update existing
      budget.limit = limit;
    } else {
      // Create new
      budget = new Budget({ month, limit });
    }

    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/budgets/:month
const getBudgetByMonth = async (req, res) => {
  const { month } = req.params;

  try {
    const budget = await Budget.findOne({ month });

    if (!budget) {
      return res.status(404).json({ error: "Budget not found for this month" });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { setBudget, getBudgetByMonth };
