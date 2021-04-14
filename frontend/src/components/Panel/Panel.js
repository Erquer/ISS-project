import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import urls from '../../services/urls';
import {
  PanelWrapper,
  H1,
  Form,
  SliderLabel,
  Wrapper,
  Slider,
  Value,
  Button,
} from './Panel.styled';

const Panel = () => {
  const inputs = [
    {
      label: 'Czas próbkowania [Ts]',
      name: 'samplingTime',
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    {
      label: 'Czas trwania [T]',
      name: 'durationTime',
      min: 1,
      max: 100,
    },
    {
      label: 'Wzmocnienie [beta]',
      name: 'beta',
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      label: 'Pole przekroju [A]',
      name: 'A',
      min: 0,
      max: 2,
      step: 0.01,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  // const [simulationData, setSimulationData] = useState({});

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      samplingTime: 1,
      durationTime: 50,
      beta: 1.0,
      A: 1.0,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await axios.post(urls.simulationData, data);
    setIsLoading(false);
    console.log(response.data);
  };

  return (
    <PanelWrapper onSubmit={handleSubmit(onSubmit)}>
      <H1>Projekt ISS</H1>

      <Form action="submit">
        {inputs.map(({ label, name, ...rest }) => (
          <SliderLabel key={label} htmlFor="sampling-time">
            {label}
            <Wrapper>
              <Slider type="range" {...rest} {...register(name)} />
              <Value>{watch(name)}</Value>
            </Wrapper>
          </SliderLabel>
        ))}

        <Button>{isLoading ? 'CZEKAJ' : 'GENERUJ'}</Button>
      </Form>
    </PanelWrapper>
  );
};

export default Panel;
