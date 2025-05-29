import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
  }
`;

export default GlobalStyle;
