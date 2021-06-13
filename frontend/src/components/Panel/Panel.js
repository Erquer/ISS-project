import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import propTypes from 'prop-types';
import post, {postFuzzy,postPID} from '../../services/restService';

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

const inputsModel = [
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
  
  {
    label: 'Ki',
    name: 'Ki',
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    label: 'Kp',
    name: 'Kp',
    min: 0.1,
    max: 4,
    step: 0.01,
  },
  {
    label: 'Kd',
    name: 'Kd',
    min: 0.1,
    max: 4,
    step: 0.1,
  },
  {
    label: 'Wartość zadana [Hz]',
    name: 'h',
    min: 1,
    max: 5,
    step: 0.1,
  },
];


const defaultModel = {
    samplingTime: 0.1,
    durationTime: 10,
    beta: 0.2,
    A: 2.0,
    h: 1.0,
    Ki: 0.1,
    Kp: 2.0,
    Kd: 1.2,
}

const Panel = ({ setSimulationData }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(null);
  const [inputs, setInputs] = useState(['A','samplingTime','durationTime', 'beta']);

  useEffect(()=>{
    if(checked === 1){
      setInputs(['A','samplingTime','durationTime', 'beta']);
    }else if(checked === 2){
      setInputs(['samplingTime','durationTime','Ki','Kp','Kd', 'h']);
    }else if(checked === 3){
      setInputs(['samplingTime', 'durationTime', 'h']);
    }
  },[checked])

 

  const { register, handleSubmit, watch } = useForm({
    defaultValues: defaultModel,
  });

  const onSubmit = async (data) => {
    // setIsLoading(true);
    const X = getTimestamps(
      parseFloat(data.samplingTime),
      parseFloat(data.durationTime)
    );
    let response = {};
    console.log(data);
    if (document.getElementById('linear').checked) {
      response = await post(data);
    } else if (document.getElementById('fuzzy').checked) {
      response = await postFuzzy(data);
    } else if (document.getElementById('pid').checked) {
      response = await postPID(data);
    }
    response.data.X = X;
    setSimulationData(response.data);
    setIsLoading(false);
  };

  const onModelCheckedChange = () => {
    setChecked(1);
  };
  const onPIDCheckedChange = () => {
    setChecked(2);
  }
  const onFuzzyCheckedChange = () => {
    setChecked(3);
  }

  const renderInputs = (inputFields) => (
      <Form action="submit">
        {inputFields.map(({ label, name, ...rest }) => (
          inputs.includes(name) &&
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
    );

  return (
    <PanelWrapper onSubmit={handleSubmit(onSubmit)}>
      <H1>Projekt ISS</H1>
      <RadioButtons>
        <RadioButton htmlFor="linear">
          Model
          <input type="radio" id="linear" name="drone" value="linear" defaultChecked onChange={onModelCheckedChange}/>
        </RadioButton>
        <RadioButton htmlFor="pid">
          PID
          <input type="radio" id="pid" name="drone" value="pid" onChange={onPIDCheckedChange}/>
        </RadioButton>
        <RadioButton htmlFor="fuzzy">
          PID rozmyty
          <input type="radio" id="fuzzy" name="drone" value="fuzzy"  onChange={onFuzzyCheckedChange}/>
        </RadioButton>
      </RadioButtons>
      {renderInputs(inputsModel)}
    </PanelWrapper>
  );
};

Panel.propTypes = {
  setSimulationData: propTypes.func.isRequired,
};

export default Panel;
