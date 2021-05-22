# Catan-Simulator

# Running Catan Simulator

### 1. Make sure you have the latest versions of Node and Python installed, and clone this repository.
Links for Node and Python if you don't already have them installed:
https://nodejs.org/en/download/
https://www.python.org/downloads/

### 2. Start venv from `/src/api/` and install packages
Run `venv\scripts\activate` followed by `py -m pip install -r requirements.txt` to install the required python packages.

Install the required node modules by running `npm i` 

### 3. Start the website
You will need two terminals to run the website, one for the frontend, and one for the backend (with venv activated).
To start the frontend run `npm start` 
To start the backend run `npm run start-api`


# Using the website
The website requires you specify the number of Catan simulations to run, which loads until they're displayed. The N limit is currently set to `100 000 000` as it takes a while to run all 100 million simulations, and probably doesn't end up adding more. Except time waiting.:watch:
To find out more about any of the simulations simply click on it's row to view all of the simulation's relevant information and stats.
Information and stats available for viewing are:
`victoryPoints`, `cardsToVictory`, `spentResources`, `villages`, `cities`, `roads`, `devCards`, `decisionTree`, `longestRoad` and `largestArmy`. Most are self-explanatory, while others aren't.

`cardsToVictory` refers to the number of resource cards spent to achieve victory in the simulation. <br>
`spentResources` refers to the number and types of resources spent during the simulation.<br>
`devCards` represents all development cards bought during the simulation.<br>
`decisionTree` is the linear history of choices logged.<br>

The virtualized table also supports column sorting in ascending and descending order. So you can run a large set of simulations and sort them to find strategies that focusing on or ignore certain aspects of Catan.
The column 'cardsToVictory' can also be sorted to find different strategies requiring the most cards to win, for those interested in loosing in the funniest way, or the strategies requiring the fewest number of cards to win. 

Perhaps you will find something to surprise your friends the next time you play a game of Catan. Or mabye just a conversation topic about :cat: :a: **N**
