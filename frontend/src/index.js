import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.styled';
import ResetStyles from './styles/reset.styled';
import GlobalStyles from './styles/global.styled';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <>
        <ResetStyles />
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
