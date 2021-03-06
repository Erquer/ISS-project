const protocol = 'http';
const hostname = 'localhost';
const port = 5000;

export default {
  simulationData: `${protocol}://${hostname}:${port}/simulation`,
  simulationPID: `${protocol}://${hostname}:${port}/simulationPID`,
  simulationFuzzy: `${protocol}://${hostname}:${port}/simulationFuzzy`,
};
