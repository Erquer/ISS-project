import React from 'react';
import { useForm } from 'react-hook-form';

import {
  PanelWrapper,
  H1,
  Form,
  SliderLabel,
  Wrapper,
  Slider,
  Value,
  Label,
  Input,
  Button,
} from './Panel.styled';

const Panel = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      samplingTime: 1,
      durationTime: 50,
      beta: 1.0,
      A: 1.0,
      tankCapacity: 100,
      parameter: 1000,
      anotherParameter: 50,
    },
  });

  const onSubmit = (data) => {
    console.log(data, JSON.stringify(data));
  };

  return (
    <PanelWrapper onSubmit={handleSubmit(onSubmit)}>
      <H1>Projekt ISS</H1>

      <Form action="submit">
        <SliderLabel htmlFor="sampling-time">
          Czas próbkowania [Ts]
          <Wrapper>
            <Slider
              type="range"
              min={0.01}
              max={1}
              step={0.01}
              {...register('samplingTime')}
            />
            <Value>{watch('samplingTime')}</Value>
          </Wrapper>
        </SliderLabel>

        <SliderLabel htmlFor="durationTime">
          Czas trwania [T]
          <Wrapper>
            <Slider
              type="range"
              min={1}
              max={100}
              {...register('durationTime')}
            />
            <Value>{watch('durationTime')}</Value>
          </Wrapper>
        </SliderLabel>

        <SliderLabel htmlFor="beta">
          Wzmocnienie [beta]
          <Wrapper>
            <Slider
              type="range"
              min={0}
              max={1}
              step={0.01}
              {...register('beta')}
            />
            <Value>{watch('beta')}</Value>
          </Wrapper>
        </SliderLabel>

        <SliderLabel htmlFor="A">
          A
          <Wrapper>
            <Slider
              type="range"
              min={0}
              max={2}
              step={0.01}
              {...register('A')}
            />
            <Value>{watch('A')}</Value>
          </Wrapper>
        </SliderLabel>

        <Label htmlFor="tankCapacity">
          Poziom zbiornika
          <Input
            type="text"
            value={watch('tankCapacity')}
            min={0}
            max={999999}
            maxLength={6}
            {...register('tankCapacity')}
          />
        </Label>

        <Label htmlFor="parameter">
          Parametr
          <Input
            type="text"
            value={watch('parameter')}
            min={0}
            max={99999}
            maxLength={5}
            {...register('parameter')}
          />
        </Label>

        <Label htmlFor="anotherParameter">
          Kolejny Parametr
          <Input
            type="text"
            value={watch('anotherParameter')}
            min={0}
            max={9999}
            maxLength={4}
            {...register('anotherParameter')}
          />
        </Label>

        <Button>GENERUJ</Button>
      </Form>
    </PanelWrapper>
  );
};

export default Panel;
