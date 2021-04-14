import CustomTable from './Table';
import React from 'react';
import { useState, useEffect } from 'react'

function App() {
  
  const [simulationList, updateSimulationList] = useState(0)
  const [loadingState, setLoadingState] = useState(1)
  
  useEffect(() => {
    fetch('/simulate').then(response => response.json()).then(data => {

      updateSimulationList(data)
      setLoadingState(0)
    });
  }, []);


  return (
    <div>
      <div className="bg-gray-800 flex p-2 m-6 rounded-lg  h-screen">
        {
        loadingState ?
        <p>Loading simulations</p> : 
        <CustomTable dataRows={simulationList}/>
        }
      </div>
    </div>
  );
}

export default App;
