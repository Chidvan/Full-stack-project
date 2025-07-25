import { useState } from "react";

const ExpenseForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !paidBy) {
      setError("All fields are required");
      return;
    }

    const expense = {
      description,
      amount: parseFloat(amount),
      paidBy,
    };

    try {
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
      } else {
        setDescription("");
        setAmount("");
        setPaidBy("");
        setError(null);
        console.log("New expense added:", json);
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
      />

      <label>Amount</label>
      <input
        type="number"
        step="0.01"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        placeholder="e.g., 150.00"
      />

      <label>Paid By</label>
      <input
        type="text"
        onChange={(e) => setPaidBy(e.target.value)}
        value={paidBy}
        placeholder="e.g., John"
      />

      <button>Add Expense</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExpenseForm;
