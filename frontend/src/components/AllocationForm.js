import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining, Currency  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {

            if(cost > remaining) {
                alert("The value cannot exceed remaining funds " + Currency+remaining);
                setCost("");
                return;
            }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (
        <div>
            <div className='row'>

            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Bills" name="bills">Bills</option>
                        <option value="Groceries" name="groceries">Groceries</option>
                        <option value="Food" name="food">Food</option>
                        <option value="Discretionary" name="discretionary">Discretionary</option>
                        <option value="Savings" name="savings">Savings</option>
                  </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Operation</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
                  </select>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp; {Currency}</p>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '.2rem' , size: 10}}
                        onChange={(event) => setCost(event.target.value)}>
                        </input>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Submit
                    </button>
                </div>
                </div>

        </div>
    );
};

export default AllocationForm;
