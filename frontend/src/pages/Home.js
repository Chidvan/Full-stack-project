import { useEffect, useState } from "react";

import ExpensesDetails from "../components/ExpensesDetails";
import ExpenseForm from "../components/ExpenseForms";

const Home = () => {
const [expenses, setExpenses] = useState([]);

const fetchExpenses = async () => {
try {
const response = await fetch("/api/expenses");
const json = await response.json();
if (response.ok) {
setExpenses(json);
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
{expenses.map((expense) => (
<ExpensesDetails key={expense._id} expense={expense} />
))}
</div>
<ExpenseForm onExpenseAdded={fetchExpenses} />
</div>
);
};

export default Home;