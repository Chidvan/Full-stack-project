import { ExpenseContext } from "../context/ExpensesContext";
import { useContext } from "react";

export const useExpenseContext = () =>{
    const context = useContext(ExpenseContext)

    if (!context){
        throw Error("useExpenseContext must be used inside an ExpenseContextProvider ")
    }

    return context
}