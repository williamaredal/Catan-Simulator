from collections import Counter
from random import choice

import numpy as np

# Figuring out the roads to victory requiring the minimum number of cards to achieve victory in catan


class Ledger:
    def __init__(
    self,
    victoryPointCondition=10,
    villageSettlement=1,
    citySettlement=2,
    startVillages=2,
    startCities=0,
    startRoads=2,
    startDevCards=[],
    maxVillages=5,
    maxCities=4,
    maxRoads=15,
    villageSpacingRequirement=2,
    longestRoad={'requirement': 5, 'points' : 2}, # minimum requirement is 5 connected roads
    largestArmy={'requirement': 3, 'points' : 2}, # minimum requirement is 3 knights
    constructionCosts={
        'village' : {'wood' : 1, 'sheep' : 1, 'wheat' : 1, 'brick' : 1},
        'city' : {'wheat' : 2, 'ore' : 3},
        'road' : {'wood' : 1, 'brick' : 1},
        'development' : {'sheep' : 1, 'wheat' : 1, 'ore' : 1}
    },
    initialResourceUsage={'wood' : 0, 'sheep' : 0, 'wheat' : 0, 'brick' : 0, 'ore' : 0},
    developmentCards=['k' for n in range(14)] + ['v' for n in range(5)] + ['i' for n in range(6)]
    ):
        
        self.victoryPointCondition = victoryPointCondition
        self.villageSettlement = villageSettlement
        self.citySettlement = citySettlement
        
        self.startVillages = startVillages
        self.startCities = startCities
        self.startRoads = startRoads
        self.startDevCards = startDevCards
        self.maxVillages = maxVillages
        self.maxCities  = maxCities
        self.maxRoads = maxRoads

        self.villageSpacingRequirement = villageSpacingRequirement

        self.longestRoad = longestRoad
        self.largestArmy = largestArmy

        self.constructionCosts = constructionCosts

        self.initialResourceUsage = initialResourceUsage
        self.developmentCards = developmentCards



class Player:

    def __init__(
    self,
    resourceCards,
    villages,
    availableVillages,
    cities,
    availableCities,
    roads,
    availableRoads,
    devCards,
    availableDevCards,
    longestRoad=False,
    largestArmy=False
    ):

        self.resourceCards = resourceCards
        self.villages = villages
        self.availableVillages = availableVillages
        self.cities = cities
        self.availableCities = availableCities
        self.roads = roads
        self.availableRoads = availableRoads
        self.devCards = devCards
        self.availableDevCards = availableDevCards
        self.longestRoad = longestRoad
        self.largestArmy = largestArmy
    
    def updateResources(self, resources):
        self.resourceCards = resources

    def updateVillages(self, villages, availableVillages):
        self.villages = villages
        self.availableVillages = availableVillages

    def updateCities(self, cities, availableCities):
        self.cities = cities
        self.availableCities = availableCities

    def updateRoads(self, roads, availableRoads):
        self.roads = roads
        self.availableRoads = availableRoads
    
    def updateDevCards(self, devCards, availableDevCards):
        self.devCards = devCards
        self.availableDevCards = availableDevCards
    
    def updateSpecialCard(self, longestRoad, largestArmy):
        self.longestRoad = longestRoad
        self.largestArmy = largestArmy




def VictoryCondition(player, ledger):
    requiredScore = ledger.victoryPointCondition
    playerScore = int(
        (player.villages * ledger.villageSettlement) +
        (player.cities * ledger.citySettlement) +
        (player.longestRoad * ledger.longestRoad['points']) + 
        (player.largestArmy * ledger.largestArmy['points'])
    )
    try:
        playerScore += player.devCards.count('v')

    except TypeError:
        return

    if playerScore < requiredScore:
        return False
    elif playerScore >= requiredScore:
        return True
    else:
        print('Point VictoryCondition met an error')


def PlayerScore(player, ledger):
    playerScore = int(
        (player.villages * ledger.villageSettlement) +
        (player.cities * ledger.citySettlement) +
        (player.longestRoad * ledger.longestRoad['points']) + 
        (player.largestArmy * ledger.largestArmy['points']) + 
        (player.devCards.count('v'))
    )
    return playerScore


def BuildRoad(player, ledger):
    player.updateResources(
        Counter(player.resourceCards) +
        Counter(ledger.constructionCosts['road'])
        )
    player.updateRoads(
        player.roads + 1,  
        player.availableRoads - 1
        )


def BuildVillage(player, ledger):
    player.updateResources(
        Counter(player.resourceCards) +
        Counter(ledger.constructionCosts['village'])
        )
    player.updateVillages(
        player.villages + 1,
        player.availableVillages - 1
        )


def BuildCity(player, ledger):
    player.updateResources(
        Counter(player.resourceCards) + 
        Counter(ledger.constructionCosts['city'])
    )
    player.updateCities(
        player.cities + 1,
        player.availableCities - 1
    )
    player.updateVillages(
        player.villages - 1,
        player.availableVillages + 1
    )


def BuyDevCard(player, ledger):
    devCardDraw = list(np.random.choice(player.availableDevCards, 1, ))
    remainingDevCards = player.availableDevCards
    remainingDevCards.remove(devCardDraw[0])

    player.updateResources(
        Counter(player.resourceCards) +
        Counter(ledger.constructionCosts['development'])
    )
    player.updateDevCards(
        (player.devCards + devCardDraw),
        remainingDevCards
    )


# think this is acting buggy, not ticking longest road on random occations
def SetSpecialCard(player, ledger):
    if (player.roads - (ledger.startRoads / ledger.startVillages)) >= (ledger.longestRoad['requirement']) and player.longestRoad == False:
        player.updateSpecialCard(True, player.longestRoad)
    if len(player.devCards) != 0 and player.devCards.count('k') >= (ledger.largestArmy['requirement']) and player.largestArmy == False:
        player.updateSpecialCard(player.largestArmy, True)
    else:
        return None





def SimulateCatanGames(numberOfSimulations, simulatedGames={}, GameLedger=Ledger()):
    for s in range(1, numberOfSimulations + 1):
        
        p1DecisionTree = []
        p1 = Player(
            GameLedger.initialResourceUsage,
            GameLedger.startVillages,
            GameLedger.maxVillages,
            GameLedger.startCities,
            GameLedger.maxCities,
            GameLedger.startRoads,
            GameLedger.maxRoads,
            GameLedger.startDevCards,
            ['k' for n in range(14)] + ['v' for n in range(5)] + ['i' for n in range(6)]
            )

        
        while VictoryCondition(p1, GameLedger) == False:

            possibleChoices = [c for c in range(1,4) if
                c == 1 and p1.availableVillages > 0 and p1.availableRoads >= GameLedger.villageSpacingRequirement
                or c == 2 and p1.availableCities > 0 and p1.villages > 0
                or c == 3 and len(p1.availableDevCards) > 0
                ]
            randomDecision = choice(possibleChoices)
            SetSpecialCard(p1, GameLedger)
            p1DecisionTree.append(randomDecision)

            # VILLAGE
            if randomDecision == 1:
                # VILLAGE AFTER BUILDING 1 ROAD
                if p1.roads > GameLedger.villageSpacingRequirement and p1.roads <= (GameLedger.villageSpacingRequirement * GameLedger.startVillages):
                    BuildRoad(p1, GameLedger)
                    BuildVillage(p1, GameLedger)
            
                # VILLAGE AFTER BUILDING 2 ROADS
                else:
                    for r in range(0, GameLedger.villageSpacingRequirement):
                        BuildRoad(p1, GameLedger)

                    BuildVillage(p1, GameLedger)

            # CITY
            elif randomDecision == 2:
                BuildCity(p1, GameLedger)

            # DEVCARD
            elif randomDecision == 3:
                BuyDevCard(p1, GameLedger)

            # COULD NOT BUILD MORE VICTORY POINTS
            else:
                print('something went wrong XD')

                if p1.availableRoads < GameLedger.villageSpacingRequirement:
                    print('Not enough roads available')
                elif p1.availableVillages < 1 and p1.availableCities < 1:
                    print('No available villages or cities')
                elif p1.villages < 1:
                    print('No available villages')
                elif p1.availableCities < 1:
                    print('No available cities')
                elif p1.availableDevCards < 1:
                    print('No available devCards')

                else:
                    print('Unexpected error...')
                break

        simulatedGames[s] = {
            'decisionTree' : p1DecisionTree,
            'victoryPoints' : PlayerScore(p1, GameLedger),
            'cardsToVictory' : sum(p1.resourceCards.values()),
            'spentResources' : p1.resourceCards,
            'villages' : p1.villages,
            'availableVillages' : p1.availableVillages,
            'cities' : p1.cities,
            'availableCities' : p1.availableCities,
            'roads' : p1.roads,
            'availableRoads' : p1.availableRoads,
            'devCards' : p1.devCards,
            'availableDevCards' : p1.availableDevCards,
            'longestRoad' : p1.longestRoad,
            'largestArmy' : p1.largestArmy
            }


    return simulatedGames
