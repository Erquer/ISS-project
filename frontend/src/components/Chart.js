import React from 'react';
import styled, { useTheme } from 'styled-components';
import propTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  width: 800px;
  height: 400px;
`;

const Chart = ({ simulationData }) => {
  const theme = useTheme();
  return (
    <ChartWrapper>
      <Line
        id="myChart"
        data={{
          labels: simulationData.data ? simulationData.X : 0,
          datasets: [
            {
              label: 'Wykres regulacji',
              data: simulationData.data,
              fill: false,
              borderColor: theme.chart,
            },
          ],
        }}
      />
    </ChartWrapper>
  );
};

Chart.propTypes = {
  simulationData: propTypes.shape({
    data: propTypes.arrayOf(propTypes.number).isRequired,
    X: propTypes.arrayOf(propTypes.number).isRequired,
  }).isRequired,
};

export default Chart;
