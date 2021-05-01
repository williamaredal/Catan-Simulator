import VirtualizedTable from './VirtualizedTable';
import Form from './Form';
import React from 'react';
import { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import "tailwindcss/tailwind.css";


function App() {
  
  const [loadingState, setLoadingState] = useState(1);
  const [virtualizedFormatedSimulationList, setVirtualizedList] = useState(0);
  const [idleScreen, setIdleScreen] = useState(1);


  function startSimulation (N) {
    setIdleScreen(0);
    setLoadingState(1);
    fetch('/simulate', {method:'POST', body:JSON.stringify(N)}).then(response => response.json()).then(data => {
      const simulationList = []
      Object.entries(data).map( ([simKey, simValue]) => {
        simulationList.push(
          { simulation: simKey,
            decisionTree: simValue.decisionTree,
            victoryPoints: simValue.victoryPoints,
            cardsToVictory: simValue.cardsToVictory,
            spentResources  : simValue.spentResources,
            villages  : simValue.villages,
            availableVillages  : simValue.availableCities,
            cities  : simValue.cities,
            availableCities  : simValue.availableCities,
            roads  : simValue.roads,
            availableRoads  : simValue.availableRoads,
            devCards  : simValue.devCards,
            availableDevCards  : simValue.availableDevCards,
            longestRoad  : simValue.longestRoad,
            largestArmy  : simValue.largestArmy  
          }
        )
      });
      setVirtualizedList(simulationList)
      setLoadingState(0);
    })
  }


  return (
    <div className="bg-blue-400 flex md:h-full">
      <Form submitData={startSimulation}/>
      { (idleScreen) ?
        <div className=" mt-32 mx-auto relative w-2/3 mb-8">
          <img src="/catanImage.jpg" alt="catanImage" className="rounded-lg"/>
        </div>
        :
        <div className="bg-gray-600 p-3 mt-32 mx-auto relative rounded-lg w-5/6 h-screen mb-8">
          {
          (loadingState && !idleScreen) ? <CircularProgress className="absolute inset-x-0 w-3/4 mx-auto"/> : 
          <VirtualizedTable dataRows={virtualizedFormatedSimulationList} />
          }
        </div>
      }
    </div>
  );
}

export default App;
