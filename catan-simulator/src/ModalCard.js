import React from 'react'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import './modal.css';

const decisionVocabulary = {
    "1": "village",
    "2": "city",
    "3": "devCard",
}

export default function ModalCard({cardData, openState, closeState}) {

    return (
        <Modal
            open={openState}
            onClose={closeState}
        >
            <Paper className="modal">
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
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">DevelopmentCards: {cardData.devCards.toString()}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">LongestRoad: {cardData.longestRoad.toString()}</h1>
                            <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">LargestArmy: {cardData.largestArmy.toString()}</h1>
                        </div>
                    </div>
                    <div>
                        <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">SpentResources: {Object.entries(cardData.spentResources).map( (resource, i) => {
                            if (Object.entries(cardData.spentResources).length === i + 1) {
                                return (
                                    <span key={String(resource[0] + i)}>{resource[0]}{':'} {resource[1]}</span>
                                );
                            }
                            else {
                                return (
                                    <span key={String(resource[0] + i)}>{resource[0]}{':'} {resource[1]}{', '}</span>
                                );
                        } 
                            } )}</h1>
                        <h1 className="rounded-md mx-4 my-4 p-2 bg-gray-300">DecisionTree: {cardData.decisionTree.map( (decision, i) => {
                            if (cardData.decisionTree.length === i + 1) {
                                return (
                                    <span key={String(i)}> {decisionVocabulary[String(decision)]} </span>
                                )
                            }
                            else {
                                return (
                                    <span key={String(i)}> {decisionVocabulary[String(decision)]}{', '} </span>
                                )
                            }
                        })}</h1>
                    </div>
                </div>

            </Paper>
        </Modal>
    )
}
