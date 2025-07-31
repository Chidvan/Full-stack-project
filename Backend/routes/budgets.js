const express = require("express");
const router = express.Router();
const { setBudget, getBudgetByMonth } = require("../controllers/budgetController");

router.post("/", setBudget);
router.get("/:month", getBudgetByMonth);

module.exports = router;
