import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';
import post, { postFuzzy, postPID } from '../../services/restService';

import {
  PanelWrapper,
  H1,
  Form,
  SliderLabel,
  Wrapper,
  Slider,
  Value,
  Button,
  RadioButtons,
  RadioButton,
} from './Panel.styled';

const getTimestamps = (sampling, duration) => {
  const timestamps = [];
  let timestamp = 0;
  for (let i = 0; i < Math.round(duration / sampling); i += 1) {
    timestamps.push(Number(timestamp.toFixed(1)));
    timestamp += sampling;
  }

  return timestamps;
};

const Panel = ({ setSimulationData }) => {
  const inputs = [
    {
      label: 'Wartość zadana [Hz]',
      name: 'h',
      min: 1,
      max: 5,
      step: 0.1,
    },
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
      min: 0.1,
      max: 4,
      step: 0.01,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      samplingTime: 1,
      durationTime: 50,
      beta: 1.0,
      A: 1.0,
      h: 1.0,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const X = getTimestamps(
      parseFloat(data.samplingTime),
      parseFloat(data.durationTime)
    );
    console.log(data)
    let response = {};
    if (document.getElementById('linear').checked) {
      response = await post(data);
    } else if (document.getElementById('fuzzy').checked) {
      response = await postFuzzy(data);
    } else if (document.getElementById('pid').checked) {
      response = await postPID(data);
    }
    console.log(response);

    response.data.X = X;
    setSimulationData(response.data);
    setIsLoading(false);
  };

  const radioChangeHandler = () => {};

  return (
    <PanelWrapper onSubmit={handleSubmit(onSubmit)}>
      <H1>Projekt ISS</H1>
      <RadioButtons onChange={radioChangeHandler}>
        <RadioButton htmlFor="linear">
          Linear
          <input type="radio" id="linear" name="drone" value="linear" />
        </RadioButton>

        <RadioButton htmlFor="fuzzy">
          Fuzzy
          <input type="radio" id="fuzzy" name="drone" value="fuzzy" />
        </RadioButton>

        <RadioButton htmlFor="pid">
          PID
          <input type="radio" id="pid" name="drone" value="pid" />
        </RadioButton>
      </RadioButtons>
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

        <Button disabled={isLoading}>{isLoading ? 'CZEKAJ' : 'GENERUJ'}</Button>
      </Form>
    </PanelWrapper>
  );
};

Panel.propTypes = {
  setSimulationData: propTypes.func.isRequired,
};

export default Panel;
