import { useEffect, useState } from "react";
import ExpensesDetails from "../components/ExpensesDetails";
import ExpenseForm from "../components/ExpenseForms";
import { useExpenseContext } from "../hooks/useExpenseContext";
import BudgetForm from "../components/BudgetForm";

const Home = () => {
  const { expenses, dispatch } = useExpenseContext();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [budget, setBudget] = useState(null);

  // Function to fetch budget
  const fetchBudget = async () => {
    try {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      if (res.ok && data.length > 0) {
        setBudget(data[0]); // Assuming only one budget entry
      } else {
        setBudget(null);
      }
    } catch (err) {
      console.error("Failed to fetch budget", err);
    }
  };

  // Call fetchBudget once on mount
  useEffect(() => {
    fetchBudget();
  }, []);

  // Fetch expenses when filters change
  useEffect(() => {
    const fetchExpenses = async () => {
      let url = "/api/expenses";
      const params = [];

      if (categoryFilter) params.push(`category=${categoryFilter}`);
      if (monthFilter) params.push(`month=${monthFilter}`);

      if (params.length > 0) {
        url = `/api/expenses/filter?${params.join("&")}`;
      }

      try {
        const response = await fetch(url);
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_EXPENSES", payload: json });
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [categoryFilter, monthFilter, dispatch]);

  // Calculate total expenses
  const totalExpenses = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

  // Budget alert
  useEffect(() => {
    if (budget && budget.limit && totalExpenses > budget.limit) {
      alert("⚠️ You have exceeded your budget!");
    }
  }, [budget, totalExpenses]);

  return (
    <div className="home">
      {/* Forms section */}
      <div className="form-budget-wrapper">
        <div className="form-section">
          <ExpenseForm />
        </div>
        <div className="budget-section">
          <BudgetForm onBudgetSet={fetchBudget} />
          {budget && (
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Budget: ₹{budget.limit.toFixed(2)} | Spent: ₹{totalExpenses.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="filters">
        <label>Filter by Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <label style={{ marginTop: "10px" }}>Filter by Month:</label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />
      </div>

      {/* Expense list */}
      <div className="expenses-horizontal">
        {Array.isArray(expenses) ? (
          expenses.map((expense) => (
            <ExpensesDetails key={expense._id} expense={expense} />
          ))
        ) : (
          <p>Loading expenses...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
