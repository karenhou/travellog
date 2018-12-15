import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTrips, getTripById } from "../../../actions/tripActions";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import MidGridLayout from "../../layout/MidGridLayout";

const styles = theme => ({
  btn: {
    marginRight: theme.spacing.unit * 2
  },
  funcBtn: {
    marginTop: theme.spacing.unit * 3
  }
});

class TripSummary extends Component {
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
            to={`/trip/${this.props.match.params.trip_id}/add-day/${day._id}`}
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
      <MidGridLayout>
        <Typography variant="h3" gutterBottom>
          {trip.country} trip Created...
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.subtitle}>
          Let's add details to each day of your journey
        </Typography>
        <div>{daysDetailContent}</div>
        <Grid container justify="flex-end" space={24}>
          <Grid item xs={12}>
            <Button
              component={Link}
              to="/dashboard"
              className={classes.funcBtn}
              variant="outlined"
              color="secondary">
              Dashboard
            </Button>
          </Grid>
        </Grid>
      </MidGridLayout>
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
