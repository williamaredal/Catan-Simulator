from flask import Flask
from flask import request
from Catan import *


app = Flask(__name__)


@app.route('/simulate', methods=['POST'])
def returnSimulations():
    simulationN = int(request.data.decode('UTF-8'))
    simulations = SimulateCatanGames(simulationN, simulatedGames={})
    return simulations