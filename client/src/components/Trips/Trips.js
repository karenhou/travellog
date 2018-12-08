import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTrips } from "../../actions/tripActions";
import Trip from "./Trip";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2.5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Trips extends Component {
  componentDidMount() {
    this.props.getTrips();
  }

  render() {
    const { trips, loading } = this.props.trip;
    const { classes } = this.props;
    console.log(trips);
    let tripItems;

    if (trips === null || loading) {
      tripItems = <CircularProgress />;
    } else {
      if (trips.length > 0) {
        tripItems = trips.map(trip => <Trip key={trip._id} trip={trip} />);
      } else {
        tripItems = <h4>No trips found...</h4>;
      }
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h2">Popular Trips</Typography>
              {tripItems}
            </Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTrips }
)(withStyles(styles)(Trips));
