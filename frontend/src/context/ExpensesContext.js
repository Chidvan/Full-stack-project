import {createContext, useReducer } from 'react'

export const ExpenseContext = createContext()

export const ExpenseReducer = (state,action) => {
    switch (action.type){
        case 'SET_EXPENSES':
            return{
                expenses: action.payload,
            };

        case 'CREATE_EXPENSE':
            return{
                expenses: [action.payload,...state.expenses],
            };
        case 'DELETE_EXPENSE':
            return{
                expenses:state.expenses.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const ExpenseContextProvider = ({children}) => {
    const[state,dispatch]=useReducer(ExpenseReducer,{
        expenses:null
    })
    
    return (
        <ExpenseContext.Provider value = {{...state,dispatch}}>
            {children}
        </ExpenseContext.Provider>
    )
}