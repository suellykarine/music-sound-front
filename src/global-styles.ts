import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  input, button, textarea, select {
    font-family: inherit;
  }


  ul, ol {
    list-style: none;
  }


  a {
    text-decoration: none;
  }

 
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }


  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;
