import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";
import MyNavbar from "./components/layout/MyNavbar";
import MyFooter from "./components/layout/MyFooter";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import Profile from "./components/profile/Profile";
import TripForm from "./components/Trips/TripForm";

import "./App.css";

import PrivateRoute from "./components/common/PrivateRoute";

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

//check for token
if (localStorage.jwtToken) {
  //set token to auth header
  setAuthToken(localStorage.jwtToken);
  //decode token to get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  //set current user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <MuiThemeProvider theme={theme}>
              <MyNavbar />
              <Route exact path="/" component={Landing} />
              <div>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-trip" component={TripForm} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
              </div>
              <MyFooter />
            </MuiThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
