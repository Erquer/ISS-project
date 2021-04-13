import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  width: 800px;
  height: 400px;
`;

const Chart = () => (
  <ChartWrapper>
    <Line
      id="myChart"
      data={{
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Wykres regulacji',
            data: [1, 3, 2, 4, 5],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
          },
        ],
      }}
    />
  </ChartWrapper>
);

export default Chart;
