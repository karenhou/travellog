import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
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
  }
};

class MyNavbar extends Component {
  render() {
    const MyLink = props => (
      <NavLink
        to="/"
        {...props}
        style={{ textDecoration: "none", color: "unset" }}
      />
    );
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={this.props.classes.menuButton}
            color="inherit"
            aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography
            component={MyLink}
            variant="h6"
            color="inherit"
            className={this.props.classes.grow}>
            Travellog
          </Typography>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
MyNavbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyNavbar));
