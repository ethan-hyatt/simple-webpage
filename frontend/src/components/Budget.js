import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, Currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    const handleBudgetChange = (event) => {
        if (event.target.value > 20000) {
            alert("Cannot have a budget greater than " + Currency + "20,000");
        }
        else if (event.target.value < totalExpenses) {
            alert("You cannot reduce the budget lower than what has already been spent")
        }
        else {
            setNewBudget(event.target.value);
            dispatch({
                type: 'SET_BUDGET',
                payload: event.target.value,
            })
        }
    }
    return (
<div className='alert alert-secondary'>
<span>Budget: {Currency}</span>
<input name="budget" type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;
