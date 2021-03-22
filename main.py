import matplotlib.pyplot as plt
from math import sqrt

Ts = 0.01
Tstop = 5
t = [i*Ts for i in range(0, int(Tstop/Ts))]

k = len(t)

beta = 0.7
A = 1.0

Qd = (k-1)*[1]
Qd.insert(0, 0)

h = k*[0]

for n in range(k-1):
    h[n+1] = (Ts / A) * Qd[n] - Ts * beta/A * sqrt(h[n]) + h[n]


plt.plot(t, h)
plt.show()