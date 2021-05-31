from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS
from gekko import GEKKO
import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


def simulate(params: dict):
    from math import sqrt
    Ts = float(params['samplingTime'])
    Tstop = float(params['durationTime'])
    t = [i * Ts for i in range(0, int(Tstop / Ts))]

    k = len(t)

    beta = float(params['beta'])
    A = float(params['A'])

    Qd = (k - 1) * [1]
    Qd.insert(0, 0)

    h = k * [0]

    Kp = 0.6
    Ki = 1.2
    Kd = 0.075
    for n in range(k - 1):
        h[n + 1] = (Ts / A) * Qd[n] - Ts * beta / A * sqrt(h[n]) + h[n]

    print(h)
    return h


def simulate_PID(params: dict):
    beta = float(params['beta'])
    Ts = float(params['samplingTime'])  # krok symulacji
    Tstop = float(params['durationTime'])  # Czas symulacji
    Tacc = 0
    A = float(params['A'])  # pole powierzchni dna
    h = 0  # wysokość cieczy
    Qd = 0
    t = []
    hs = []
    i = 0
    hmax = 2
    # h zadane
    hz = float(params['h'])
    e = hz - h
    I = 0

    # Nastawy wyznaczone eksperymentalnie
    Kp = 2
    Ki = 0.1
    Kd = 1.2

    while Tacc <= Tstop:
        t.append(Tacc)
        hs.append(h)

        e_n = hz - h
        # PID
        P = Kp * e
        I = I + Ki * e * Ts
        D = Kd * (e_n - e) / Ts

        Qd = Qd + P + I + D
        if Qd < 0:
            Qd = 0
        elif Qd > hmax:
            Qd = hmax

        # Wypływ ze zbiornika
        Q0 = beta * pow(h, 0.5)

        # new h
        h = (Qd - Q0) * Ts / A + h

        if h > hmax:
            h = 2
        elif h < 0:
            h = 0
        i += 1
        Tacc += Ts
        e = e_n
    print(t, hs)
    # plot data
    plt.figure(1)
    plt.plot(t, hs)
    plt.xlabel("Time (hrs)")
    plt.ylabel("Height (m)")
    plt.show()
    return hs


simulate_PID({'beta': 0.2, 'samplingTime': 0.2, 'durationTime': 100.0, 'A': 3, 'h': 1.5 })


@app.route('/simulation', methods=['POST'])
def simulation():
    if request.method == 'POST':
        print(request.json)
        return jsonify({
            'data': simulate(request.json)
        })


@app.route('/simulationpid', methods=['POST'])
def simulationPID():
    if request.method == 'POST':
        print(request.json)
        return jsonify({
            data: simulate_PID(request.json)
        })
