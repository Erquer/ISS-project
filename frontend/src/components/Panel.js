import React from 'react';
import styled from 'styled-components';

const PanelWrapper = styled.div`
  width: 450px;
  height: 900px;

  position: relative;
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 0 60px;

  & :nth-child(4) {
    margin-top: 30px;
  }
`;

const SliderLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin-bottom: 30px;
`;

const Slider = styled.input`
  margin-top: 18px;
  width: 80%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  outline: none;

  -webkit-appearance: none;
  &::-webkit-slider-runnable-track {
    height: 8px;
    background: ${({ theme }) => theme.secondary};
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    margin-top: -8px;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  text-align: center;
  width: 50px;
  height: 30px;
  background-color: ${({ theme }) => theme.secondary};
  outline: none;
  border: none;
`;

const Button = styled.button`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.secondary};
  outline: none;
  border: none;
  cursor: pointer;
  letter-spacing: 1px;

  :hover {
    opacity: 0.8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const Value = styled.span`
  margin-bottom: -3px;
`;

const Panel = () => (
  <PanelWrapper>
    <H1>Projekt ISS</H1>
    <Form action="submit">
      <SliderLabel htmlFor="sampling-time">
        Czas próbkowania
        <Wrapper>
          <Slider type="range" name="samplingTime" />
          <Value>21</Value>
        </Wrapper>
      </SliderLabel>

      <SliderLabel htmlFor="total-time">
        Czas trwania
        <Wrapper>
          <Slider type="range" name="totalTime" />
          <Value>21</Value>
        </Wrapper>
      </SliderLabel>

      <SliderLabel htmlFor="total-time">
        Wzmocnienie
        <Wrapper>
          <Slider type="range" name="beta" />
          <Value>21</Value>
        </Wrapper>
      </SliderLabel>

      <Label htmlFor="total-time">
        Poziom zbiornika
        <Input value="1.0" type="text" name="beta" />
      </Label>

      <Label htmlFor="total-time">
        Parametr
        <Input value="10.0" type="text" name="beta" />
      </Label>

      <Label htmlFor="total-time">
        Coś tam
        <Input value="20.0" type="text" name="beta" />
      </Label>

      <Button>GENERUJ</Button>
    </Form>
  </PanelWrapper>
);

export default Panel;
