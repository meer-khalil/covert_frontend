import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserProvider } from "./context/UserContext";

import IsAuthenticated from "./util/IsAuthenticated";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme/theme.js"; // import ThemeConfig from './theme';
import ReactGA from "react-ga4";

// TODO Create a GA Account, get a measurement ID and initialize it
ReactGA.initialize("G-K9KMN73F6E");
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <UserProvider>
        <IsAuthenticated />
        <ToastContainer />
        <App />
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>
);
