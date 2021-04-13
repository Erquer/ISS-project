from flask import Flask, request
from flask.json import jsonify

app = Flask(__name__)


def simulateProcess(precessData: dict):
    from math import sqrt
    Ts = float(precessData['samplingTime'])
    Tstop = float(precessData['durationTime'])
    t = [i*Ts for i in range(0, int(Tstop/Ts))]

    k = len(t)

    beta = float(precessData['beta'])
    A = float(precessData['A'])

    Qd = (k-1)*[1]
    Qd.insert(0, 0)

    h = k*[0]

    for n in range(k-1):
        h[n+1] = (Ts / A) * Qd[n] - Ts * beta/A * sqrt(h[n]) + h[n]

    return h


@app.route('/process', methods=['POST'])
def processSimulation():
    if request.method == 'POST':
        return jsonify({
            'data': simulateProcess(request.json)
        })
