import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background:
      'url("https://source.unsplash.com/Ye6rupMjAWk/1360x640") no-repeat',
    height: "80vh",
    textAlign: "center"
  },
  cont: {
    marginTop: "15vh"
  },
  title: {
    color: "white"
  }
});

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <Paper className={this.props.classes.root} elevation={1}>
          <Grid className={this.props.classes.cont} container spacing={24}>
            <Grid item xs />
            <Grid item xs={6}>
              <Typography
                className={this.props.classes.title}
                variant="h1"
                component="h3">
                Travellog
              </Typography>
              <Typography
                className={this.props.classes.title}
                variant="h6"
                component="h3">
                Create an account or login to share your journey with others
              </Typography>
            </Grid>
            <Grid item xs />
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs />
            <Grid item xs={1}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                className={this.props.classes.button}
                color="primary">
                Login
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                className={this.props.classes.button}
                color="primary">
                SignUp
              </Button>
            </Grid>
            <Grid item xs />
          </Grid>
        </Paper>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Landing));
