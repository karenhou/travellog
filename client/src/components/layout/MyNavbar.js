import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    // flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  myNavLink: {
    textDecoration: "none",
    color: "unset"
  },
  search: {
    position: "",
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5
  }
});

class MyNavbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const MyLink = props => (
      <NavLink
        to="/"
        {...props}
        style={{ textDecoration: "none", color: "unset" }}
      />
    );

    const tripLink = props => (
      <NavLink
        to="/trips"
        {...props}
        style={{ textDecoration: "none", color: "unset" }}
      />
    );
    const dashoboardLink = props => (
      <NavLink
        to="/dashboard"
        {...props}
        style={{ textDecoration: "none", color: "unset" }}
      />
    );

    const { isAuthenticated, user } = this.props.auth;
    const { classes } = this.props;
    const loggedUser = (
      <Button color="inherit" onClick={this.onLogoutClick}>
        Logout
      </Button>
    );
    const guestUser = (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    );
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography
            component={MyLink}
            variant="h6"
            color="inherit"
            className={classes.grow}>
            Travellog
          </Typography>
          <Typography
            className={classes.search}
            component={tripLink}
            variant="h6"
            color="inherit">
            Trips
          </Typography>
          <Typography
            className={classes.search}
            component={dashoboardLink}
            variant="h6"
            color="inherit">
            Dashboard
          </Typography>
          {isAuthenticated ? loggedUser : guestUser}
        </Toolbar>
      </AppBar>
    );
  }
}
MyNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withStyles(styles)(MyNavbar));
