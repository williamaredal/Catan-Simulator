import React from 'react'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import './modal.css';


export default function ModalCard({cardData, openState, closeState}) {

    return (
        <Modal
            open={openState}
            onClose={closeState}
        >
            <Paper class="modal">
                <div>
                    <h1 className="rounded-md mx-4 my-10 p-2 bg-gray-300">Simulation: {cardData.simulation}</h1>
                    <div className="grid grid-cols-2">
                        <div>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">VictoryPoints: {cardData.victoryPoints}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">CardsToVictory: {cardData.cardsToVictory}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">Villages: {cardData.villages}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">Cities: {cardData.cities}</h1>
                        </div>

                        <div>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">Roads: {cardData.roads}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">DevelopmentCards: {cardData.devCards}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">LongestRoad: {cardData.longestRoad.toString()}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">LargestArmy: {cardData.largestArmy.toString()}</h1>
                        </div>
                    </div>
                    <div>
                        <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">SpentResources: {Object.entries(cardData.spentResources).map( (resource) => (<span>{resource[0]}{':'} {resource[1]}{', '}</span>) )}</h1>
                        <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">DecisionTree: {cardData.decisionTree.toString()}</h1>
                    </div>
                </div>

            </Paper>
        </Modal>
    )
}
