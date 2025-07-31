import { useState } from "react";
import { useExpenseContext } from "../hooks/useExpenseContext";

const ExpenseForm = () => {
  const { dispatch } = useExpenseContext();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      description,
      amount: parseFloat(amount),
      paidBy,
      category,
    };

    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // format: "YYYY-MM"

    try {
      // Fetch total expenses for the current month
      const resExpenses = await fetch(`/api/expenses/filter?month=${currentMonth}`);
      const expensesForMonth = await resExpenses.json();
      const totalSoFar = Array.isArray(expensesForMonth)
        ? expensesForMonth.reduce((sum, e) => sum + e.amount, 0)
        : 0;

      const newTotal = totalSoFar + expense.amount;

      // Fetch the budget for the current month
      const resBudget = await fetch(`/api/budgets/${currentMonth}`);
      const budgetData = await resBudget.json();

      if (resBudget.ok && newTotal > budgetData.limit) {
        alert("🚫 Cannot add expense. Budget exceeded!");
        return;
      }

      // Proceed with adding the expense
      const response = await fetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong");
        setEmptyFields(json.emptyFields || []);
      } else {
        setDescription("");
        setAmount("");
        setPaidBy("");
        setCategory("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_EXPENSE", payload: json });
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Expense</h3>

      <label>Expense Title</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="e.g., Grocery"
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Amount</label>
      <input
        type="number"
        step="0.01"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        placeholder="e.g., 150.00"
        className={emptyFields.includes("amount") ? "error" : ""}
      />

      <label>Paid By</label>
      <input
        type="text"
        onChange={(e) => setPaidBy(e.target.value)}
        value={paidBy}
        placeholder="e.g., John"
        className={emptyFields.includes("paidBy") ? "error" : ""}
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={emptyFields.includes("category") ? "error" : ""}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <button>Add Expense</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExpenseForm;
