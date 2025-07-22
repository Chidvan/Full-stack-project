import { useEffect,useState } from "react"

import ExpensesDetails from '../components/ExpensesDetails'
const Home = () => {
    const [expenses,setExpenses] = useState(null)

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses')
            const json = await response.json()

            if (response.ok){
                setExpenses(json)
            }
        }
        fetchExpenses()
    },[])
    return(
        <div className="home">
            <div className = "expenses">
                {expenses && expenses.map((expense) => (
                    <ExpensesDetails key={expense._id} expense = {expense}/>
                ))}
            </div>
        </div>
    )
}

export default Home