import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./Themes/Theme";
import Routes from "./Routes/Routes";
import firebase from "./config/firebase";
import "./App.css";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });
  return firebaseInitialized !== false ? (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}

export default App;
