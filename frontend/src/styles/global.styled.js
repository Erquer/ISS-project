import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  h1 {
    color: ${({theme}) => theme.textLight};
    font-size: 24px;
  }
`;

export default GlobalStyles;
