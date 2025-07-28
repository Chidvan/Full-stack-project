import { useEffect } from "react";
import ExpensesDetails from "../components/ExpensesDetails";
import ExpenseForm from "../components/ExpenseForms";
import { useExpenseContext } from "../hooks/useExpenseContext";

const Home = () => {
  const { expenses, dispatch } = useExpenseContext();

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: json });
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="home">
      <div className="expenses">
        {Array.isArray(expenses) ? (
          expenses.map((expense) => (
            <ExpensesDetails key={expense._id} expense={expense} />
          ))
        ) : (
          <p>Loading expenses...</p>
        )}
      </div>
      <ExpenseForm onExpenseAdded={fetchExpenses} />
    </div>
  );
};

export default Home;
