import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
  const {dispatch } = useContext(AppContext);

    const changeCurrency = (val)=>{
            dispatch({
                type: 'CHG_CURRENCY',
                payload: val,
            })
    }


  return (
        <div style={{color:"black", backgroundColor:'lightgreen'}} className='alert alert-secondary'> Currency {
      <select style={{color:"black", backgroundColor:'lightgreen', width:'150px'}} name="Currency" id="Currency" onChange={event=>changeCurrency(event.target.value)}>
        <option style={{backgroundColor:'lightgreen'}} value="$">$ Dollar</option>
        <option style={{backgroundColor:'lightgreen'}} value="£">£ Pound</option>
        <option style={{backgroundColor:'lightgreen'}} value="€">€ Euro</option>
        <option style={{backgroundColor:'lightgreen'}} value="₹">₹ Ruppee</option>
      </select>
      }
    </div>
    );
};

export default Currency;
