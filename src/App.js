import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Grid from "./components/Grid";

const palette = {
  //colors from https://clrs.cc/
  darkBlue: "#001f3f",
  black: "#111111",
  green: "#2ECC40",
  red: "#FF4136",
  yellow: "#FFDC00"
};

const theme = {
  primaryColor: palette.green,
  secondaryColor: palette.red,
  darkBackgroundColor: palette.darkBlue,
  defaultFontColor: palette.yellow
};

const GlobalStyle = createGlobalStyle`
    html {
        background: ${props => props.theme.darkBackgroundColor};
        display: flex;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, Helvetica Neue, sans-serif;
        margin: auto;
        text-align: center;
        transition: background-color 1s;
        color: ${props => props.theme.defaultFontColor}
    }
  `;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Grid />
    </ThemeProvider>
  );
}

export default App;
