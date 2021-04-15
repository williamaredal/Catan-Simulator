import CustomTable from './Table';
import React from 'react';
import { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {
  
  const [simulationList, updateSimulationList] = useState(0)
  const [loadingState, setLoadingState] = useState(1)
  
  useEffect(() => {
    fetch('/simulate').then(response => response.json()).then(data => {
      updateSimulationList(data);
      setLoadingState(0);
    });
  }, []);


  return (
    <div className="bg-blue-400 flex">
      <div className="bg-gray-600 flex p-3 mt-12 mx-auto rounded-lg w-5/6 h-screen">
        {
        loadingState ? <CircularProgress class="absolute inset-x-0 w-3/4 mx-auto"/> : 
        <CustomTable dataRows={simulationList}/>
        }
      </div>
    </div>
  );
}

export default App;
