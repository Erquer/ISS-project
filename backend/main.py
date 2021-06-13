from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import skfuzzy.control as ctrl

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
    for n in range(k - 1):
        h[n + 1] = (Ts / A) * Qd[n] - Ts * beta / A * sqrt(h[n]) + h[n]
    plt.figure(1)
    plt.plot(t, h)
    plt.xlabel("Time (hrs)")
    plt.ylabel("Height (m)")
    plt.show()
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
    hmax = 5
    # h zadane
    hz = float(params['h'])
    e = hz - h
    I = 0

    # Nastawy wyznaczone eksperymentalnie
    Kp = float(params['Kp'])
    Ki = float(params['Ki'])
    Kd = float(params['Kd'])

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
            h = hmax
        elif h < 0:
            h = 0
        i += 1
        Tacc += Ts
        e = e_n
    plt.figure(1)
    plt.plot(t, hs)
    plt.xlabel("Time (hrs)")
    plt.ylabel("Height (m)")
    plt.show()
    return hs


def simulate_fuzzy(params: dict):
    # NB, NM, NS, ZE, PS, PM, and PB
    # respectively
    # stand
    # for negative big, negative middle,
    # negative small, zero, positive small, positive middle, and positive big
    universe = np.linspace(-2, 2, 5)

    # Create inputs and output
    delta = ctrl.Antecedent(universe, 'delta')
    error = ctrl.Antecedent(universe, 'error')
    output = ctrl.Consequent(universe, 'output')

    # names for rules.
    names = ['nb', 'ns', 'ze', 'ps', 'pb']
    # specification of names of terms
    delta.automf(names=names)
    error.automf(names=names)
    output.automf(names=names)
    error['ze'].view()
    # Defining rules for fuzzy logic
    rule0 = ctrl.Rule(antecedent=((error['nb'] & delta['nb']) |
                                  (error['ns'] & delta['nb']) |
                                  (error['nb'] & delta['ns'])),
                      consequent=output['nb'], label='rule nb')

    rule1 = ctrl.Rule(antecedent=((error['nb'] & delta['ze']) |
                                  (error['nb'] & delta['ps']) |
                                  (error['ns'] & delta['ns']) |
                                  (error['ns'] & delta['ze']) |
                                  (error['ze'] & delta['ns']) |
                                  (error['ze'] & delta['nb']) |
                                  (error['ps'] & delta['nb'])),
                      consequent=output['ns'], label='rule ns')

    rule2 = ctrl.Rule(antecedent=((error['nb'] & delta['pb']) |
                                  (error['ns'] & delta['ps']) |
                                  (error['ze'] & delta['ze']) |
                                  (error['ps'] & delta['ns']) |
                                  (error['pb'] & delta['nb'])),
                      consequent=output['ze'], label='rule ze')

    rule3 = ctrl.Rule(antecedent=((error['ns'] & delta['pb']) |
                                  (error['ze'] & delta['pb']) |
                                  (error['ze'] & delta['ps']) |
                                  (error['ps'] & delta['ps']) |
                                  (error['ps'] & delta['ze']) |
                                  (error['pb'] & delta['ze']) |
                                  (error['pb'] & delta['ns'])),
                      consequent=output['ps'], label='rule ps')

    rule4 = ctrl.Rule(antecedent=((error['ps'] & delta['pb']) |
                                  (error['pb'] & delta['pb']) |
                                  (error['pb'] & delta['ps'])),
                      consequent=output['pb'], label='rule pb')

    # Creating control system for our tank
    system = ctrl.ControlSystem(rules=[rule0, rule1, rule2, rule3, rule4])
    # create simulation
    sim = ctrl.ControlSystemSimulation(system)
    # Begin the simulation
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
    hmax = 5
    # h zadane
    hz = float(params['h'])
    e = hz - h
    print('Before while', A, h, hz, e, hmax, i, t, hs, Ts, Tacc, Tstop)
    while Tacc <= Tstop:
        t.append(Tacc)
        hs.append(h)
        e_n = hz - h
        # simulation computations
        sim.input['error'] = e
        sim.input['delta'] = (e_n - e) / Ts
        sim.compute()

        Qd = 10 * sim.output['output']
        if Qd < 0:
            Qd = 0
        elif Qd > hmax:
            Qd = hmax

        # Wypływ ze zbiornika
        Q0 = beta * pow(h, 0.5)

        # new h
        h = (Qd - Q0) * Ts / A + h

        if h > hmax:
            h = hmax
        elif h < 0:
            h = 0
        i += 1
        Tacc += Ts
        e = e_n
    plt.figure(1)
    plt.plot(t, hs)
    plt.xlabel("Time (hrs)")
    plt.ylabel("Height (m)")
    plt.show()
    return hs


@app.route('/simulation', methods=['POST'])
def simulation():
    if request.method == 'POST':
        print(request.json)
        return jsonify({
            'data': simulate(request.json)
        })


@app.route('/simulationPID', methods=['POST'])
def simulationPID():
    if request.method == 'POST':
        print(request.json)
        return jsonify({
            'data': simulate_PID(request.json)
        })


@app.route('/simulationFuzzy', methods=['POST'])
def simulationFuzzy():
    if request.method == 'POST':
        print(request.json)
        return jsonify({
            'data': simulate_fuzzy(request.json)
        })
