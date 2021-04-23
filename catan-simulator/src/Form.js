import React, { useState } from 'react';
import './form.css';

export default function Form ({submitData}) {
    const [inputValue, setInput] = useState(0);
    
    function updateInput (event) {
        setInput(event.target.value)
    }

    function validateData () {
        if ((inputValue % 1 === 0) && (inputValue > 0) && (inputValue < 100000000)) {
            submitData(Number(inputValue));
        }
        
        else {
            alert('Enter a valid number 1 - 100.000.000')
        }
    }

    
    return (
        <div className="inputForm">
            <input type="number" onChange={(event) => updateInput(event)} placeholder="N Catan simulations" className="rounded-l-xl p-3" />
            <button onClick={validateData} className="rounded-r-xl p-3 bg-black text-white">Simulate</button>
        </div>
    )
}