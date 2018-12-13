import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTrips, getTripById } from "../../../actions/tripActions";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  },
  funcBtn: {
    marginTop: theme.spacing.unit * 3
  }
});

class TripSummary extends Component {
  state = {
    diff: 0
  };
  onBack = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }
  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;
    let daysDetailContent = [];

    if (trip === null || loading) {
      daysDetailContent = <CircularProgress />;
    } else {
      if (trip.length > 0) {
        daysDetailContent = trip.days.map((day, index) => (
          <Button
            key={index}
            component={Link}
            to={`/add-day/${this.props.match.params.trip_id}/${day._id}`}
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary">
            {moment.utc(day.date).format("YYYY-MM-DD")}
          </Button>
        ));
      } else {
        daysDetailContent = <h4>No day found...</h4>;
      }
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        {trip === null ? (
          <CircularProgress />
        ) : (
          <Paper className={classes.paper}>
            <Typography variant="h3">{trip.country} trip Created...</Typography>
            <p className="lead text-center">
              Let's add details to each day of your journey
            </p>
            <div>{daysDetailContent}</div>

            <Grid justify="flex-end" container space={16}>
              <Grid item />
              <Grid item />
              <Grid item xs={2}>
                <Button
                  onClick={this.onBack}
                  className={classes.funcBtn}
                  variant="outlined"
                  color="secondary">
                  Back
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  component={Link}
                  to="/dashboard"
                  className={classes.funcBtn}
                  variant="outlined"
                  color="secondary">
                  Ok
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </main>
    );
  }
}
TripSummary.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTrips, getTripById }
)(withStyles(styles)(TripSummary));
