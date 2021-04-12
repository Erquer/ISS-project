import React from 'react';
import ReactDOM from 'react-dom';
import ResetStyles from './styles/reset.styled';
import GlobalStyles from './styles/global.styled';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <>
      <ResetStyles />
      <GlobalStyles />
      <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
