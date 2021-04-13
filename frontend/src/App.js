import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-auto-columns: 3;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundDark};
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
  border-radius: 30px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const Panel = styled(Card)`
  grid-column: 1;
  justify-self: end;

  width: 450px;
  height: 900px;
`;

const Chart = styled(Card)`
  grid-column: 2/4;
  justify-self: center;

  width: 800px;
  height: 400px;
`;

const App = () => (
  <Layout>
    <Panel>
      <h1>ProjektISS</h1>
    </Panel>
    <Chart>
      <h1>Wykres</h1>
    </Chart>
  </Layout>
);

export default App;
