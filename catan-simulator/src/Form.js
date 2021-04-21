import React, { useState } from 'react';
import './form.css';

export default function Form () {
    const [inputValue, setInput] = useState(0);
    
    function updateInput (event) {
        // logic for validating input value being valid integer
        setInput(event.target.value)
        console.log(event.target.value)
    }

    function startSimulation () {
        // logic for validating input value being valid integer
        console.log('simulate', inputValue)
    }

    return (
        <div class="inputForm">
            <input onChange={(event) => updateInput(event)} placeholder="N Catan simulations" className="rounded-l-xl p-3" />
            <button type="integer" onClick={startSimulation} className="rounded-r-xl p-3 bg-black text-white">Simulate</button>
        </div>
    )
}