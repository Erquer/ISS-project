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

export { Value, Wrapper, Button, Slider, SliderLabel, Form, H1, PanelWrapper };
