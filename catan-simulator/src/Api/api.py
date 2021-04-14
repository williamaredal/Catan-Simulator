import time
from flask import Flask
from Catan import *


app = Flask(__name__)


@app.route('/simulate')
def get_current_time():
    simulations = SimulateCatanGames(100)
    return simulations