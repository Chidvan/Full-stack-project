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