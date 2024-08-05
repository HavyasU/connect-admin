// 1. Import the extendTheme function
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { Fonts } from "./theme";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Fonts />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </>
);
