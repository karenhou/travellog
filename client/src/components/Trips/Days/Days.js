import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { getTrips, getTripById } from "../../../actions/tripActions";

import Trip from "../Trip";
import Day from "./Day";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  main: {
    flexGrow: 1,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 5,
    width: 200
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  btn: {
    marginRight: theme.spacing.unit * 2
  }
});

class Days extends Component {
  state = {
    diff: 0
  };
  componentDidMount() {
    this.props.getTrips();

    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }
  render() {
    const { classes } = this.props;
    const { trip, loading, days } = this.props.trip;
    let daysDetailContent = [];
    console.log(this.props);
    if (trip === null || loading) {
      daysDetailContent = <CircularProgress />;
    } else {
      if (trip.length > 0) {
        for (let i = 0; i < trip.length; i++) {
          daysDetailContent.push(
            <Button
              component={Link}
              to={`/add-day/${this.props.match.params.trip_id}/${i + 1}`}
              className={classes.btn}
              type="submit"
              variant="contained"
              color="primary">
              Day {i + 1}
            </Button>
          );
        }
      } else {
        daysDetailContent = <h4>No day found...</h4>;
      }
    }
    return (
      <main className={classes.main}>
        {/* <Trip trip={trip} /> */}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h3">{trip.country} trip Created...</Typography>
          <p className="lead text-center">
            Let's add details to each day of your journey
          </p>
          <p>{daysDetailContent}</p>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTrips, getTripById }
)(withStyles(styles)(Days));
