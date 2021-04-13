import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const StyledLayout = styled.div`
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

const ChartCard = styled(Card)`
  grid-column: 2/4;
  justify-self: center;

  width: 800px;
  height: 400px;
`;

const PanelCard = styled(Card)`
  grid-column: 1;
  justify-self: end;

  width: 450px;
  height: 900px;
`;

const Layout = ({ panel, chart }) => (
  <StyledLayout>
    <PanelCard>{panel}</PanelCard>
    <ChartCard>{chart}</ChartCard>
  </StyledLayout>
);

Layout.propTypes = {
  panel: propTypes.node.isRequired,
  chart: propTypes.node.isRequired,
};

export default Layout;
