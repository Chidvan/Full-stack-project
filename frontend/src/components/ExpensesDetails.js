const ExpensesDetails = ({expense}) => {
    return(
        <div className = "expense-details">
            <h4>{expense.description}</h4>
            <p><strong>Amount(Rs):</strong>{expense.amount}</p>
            <p><strong>PaidBy</strong>{expense.paidBy}</p>
            <p>{expense.createdAt}</p>
        </div>
    )
}

export default ExpensesDetails