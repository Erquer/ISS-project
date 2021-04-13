import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, p {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    color: ${({ theme }) => theme.textLight};
    font-weight: 700;
    font-size: 36px;
  }
`;

export default GlobalStyles;
