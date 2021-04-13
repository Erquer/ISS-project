import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, p, button, form, label, input {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    color: ${({ theme }) => theme.textLight};
    font-weight: 700;
    font-size: 36px;
  }
  
  label, input {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 1.125em;
  }

  button {
    color: ${({ theme }) => theme.text};
    font-weight: 700;
    font-size: 1.125em;
  }
`;

export default GlobalStyles;
