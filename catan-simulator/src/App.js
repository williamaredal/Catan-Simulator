import VirtualizedTable from './VirtualizedTable';
import Form from './Form';
import React from 'react';
import { useState, useEffect,  } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {
  
  const [simulationList, updateSimulationList] = useState(0);
  const [loadingState, setLoadingState] = useState(1);
  const virtualizedFormatedSimulationList = [];

  useEffect(() => {
    fetch('/simulate').then(response => response.json()).then(data => {
      updateSimulationList(data);
      setLoadingState(0);
    });
  }, []);


  Object.entries(simulationList).map( ([simKey, simValue]) => {
    virtualizedFormatedSimulationList.push(
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
  })

  return (
    <div className="bg-blue-400 flex">
      <Form />
      <div className="bg-gray-600 p-3 mt-32 mx-auto static rounded-lg w-5/6 h-screen">
        {
        loadingState ? <CircularProgress className="absolute inset-x-0 w-3/4 mx-auto"/> : 
        <VirtualizedTable dataRows={virtualizedFormatedSimulationList} />
        }
      </div>
    </div>
  );
}

export default App;
