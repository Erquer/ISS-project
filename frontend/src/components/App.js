import React from 'react';
import Panel from './Panel/Panel';
import Chart from './Chart';
import Layout from './Layout';

const App = () => <Layout panel={<Panel />} chart={<Chart />} />;

export default App;
