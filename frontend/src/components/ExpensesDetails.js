import { useExpenseContext } from "../hooks/useExpenseContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const ExpensesDetails = ({ expense }) => {
  const { dispatch } = useExpenseContext()

  const handleClick = async () => {
    const response = await fetch("/api/expenses/" + expense._id, {
      method: "DELETE",
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_EXPENSE", payload: json })
    }
  }

  return (
    <div className="expense-details">
      <h4>{expense.description}</h4>
      <p><strong>Amount (Rs):</strong> {expense.amount}</p>
      <p><strong>Paid By:</strong> {expense.paidBy}</p>
      <p><strong>Category:</strong> {expense.category}</p>
      {expense.createdAt && (
        <p>
          {formatDistanceToNow(new Date(expense.createdAt), {
            addSuffix: true,
          })}
        </p>
      )}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  )
}

export default ExpensesDetails
