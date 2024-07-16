import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { FaPlusCircle} from 'react-icons/fa';
import { FaMinusCircle} from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, Currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });

    }

    return (
        <tr>
        <td>{props.name}</td>
        <td>{Currency}{props.cost}</td>
        <td><FaPlusCircle fontSize='35px' style={{color:'green', marginLeft:'35px'}} onClick={event=> increaseAllocation(props.name)}></FaPlusCircle></td>
        <td><FaMinusCircle fontSize='35px' style={{color:'red', marginLeft:'40px'}} onClick={event=> decreaseAllocation(props.name)}></FaMinusCircle></td>
        <td><TiDelete style={{marginLeft:'30px'}} size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
