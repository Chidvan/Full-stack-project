import { useState } from "react";

const BudgetForm = () => {
  const [month, setMonth] = useState("");
  const [limit, setLimit] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budget = { month, limit: parseFloat(limit) };

    const res = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Budget set successfully");
    } else {
      setMessage(data.error || "❌ Failed to set budget");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="budget-form">
      <h3>Set Monthly Budget</h3>
      <form onSubmit={handleSubmit}>
        <label>Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />

        <label>Budget Limit (₹):</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />

        <button type="submit">Set Budget</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default BudgetForm;

