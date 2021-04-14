import React, { useState } from 'react';
import Panel from './Panel/Panel';
import Chart from './Chart';
import Layout from './Layout';

const App = () => {
  const [simulationData, setSimulationData] = useState({});
  return (
    <Layout
      panel={<Panel setSimulationData={setSimulationData} />}
      chart={<Chart simulationData={simulationData} />}
    />
  );
};

export default App;
