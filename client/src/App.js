import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MyNavbar from "./components/layout/MyNavbar";
import MyFooter from "./components/layout/MyFooter";
import Landing from "./components/layout/Landing";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00796b",
      type: "dark"
    },
    secondary: {
      main: "#80cbc4"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <MuiThemeProvider theme={theme}>
              <MyNavbar />
              <Landing />
              <MyFooter />
            </MuiThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
