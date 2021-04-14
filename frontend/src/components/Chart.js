import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  width: 800px;
  height: 400px;
`;

const Chart = ({ simulationData }) => (
  <ChartWrapper>
    <Line
      id="myChart"
      data={{
        labels: simulationData.data
          ? Array(simulationData.data.length).fill(1)
          : 0,
        datasets: [
          {
            label: 'Wykres regulacji',
            data: simulationData.data,
            fill: false,
            borderColor: '#36A2EB',
          },
        ],
      }}
    />
  </ChartWrapper>
);

Chart.propTypes = {
  simulationData: propTypes.shape({
    data: propTypes.arrayOf(propTypes.number).isRequired,
  }).isRequired,
};

export default Chart;
