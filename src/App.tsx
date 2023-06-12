import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { AuthProvider } from "./common/context/AuthContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  ul, li, ol {
    margin:0;
    padding:0;
    list-style:none;
    list-style-type:none;
  }

  html, body {
    margin:0;
    padding:0;
    width:100%;
    height: 100%;

    background-color: #0d5c75;
  }  
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
