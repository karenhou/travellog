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
import isEmpty from "../../../validation/is-empty";
const styles = theme => ({
  btn: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  funcBtn: {
    marginTop: theme.spacing.unit * 3
  }
});

class DaySummary extends Component {
  state = {
    date: ""
  };
  onBack = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.trip.trip)) {
      const days = nextProps.trip.trip.days;
      if (days !== null) {
        days.map(day => {
          if (this.props.match.params.day_id === day._id) {
            console.log(day);
            this.setState({
              date: day.date
            });
            // this.setState({
            //   cities: [...day.cities],
            //   hotel: day.hotel,
            //   // photoLinks: [...day.photoLinks],
            //   date: day.date,
            //   schedule: day.schedule
            // });
          }
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;
    const { days } = this.props.trip.trip;
    let daysDetailContent = [];

    if (trip === null || loading) {
      daysDetailContent = <CircularProgress />;
    } else {
      if (!isEmpty(trip)) {
        let newCity;
        for (let x in days) {
          if (days[x]._id === this.props.match.params.day_id) {
            newCity = days[x];
            break;
          }
        }
        if (newCity) {
          daysDetailContent = newCity.cities.map((city, index) => (
            <Button
              key={index}
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}/${
                this.props.match.params.day_id
              }/${city._id}/add-poi`}
              className={classes.btn}
              type="submit"
              variant="contained"
              color="primary">
              {city.name}
            </Button>
          ));
        }
      } else {
        daysDetailContent = <h4>No day found...</h4>;
      }
    }
    return (
      <MidGridLayout>
        <Typography variant="h3" gutterBottom>
          {moment.utc(this.state.date).format("YYYY-MM-DD")} Day Summary
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Let's add POI in each city you visited
        </Typography>
        <div>{daysDetailContent}</div>

        <Grid container space={24}>
          <Grid item xs={6} lg={4}>
            <Button
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}`}
              className={classes.btn}
              variant="outlined"
              color="secondary">
              Back to Trip
            </Button>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Button
              component={Link}
              to="/dashboard"
              className={classes.btn}
              variant="outlined"
              color="secondary">
              Dashboard
            </Button>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Button
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}/update-day/${
                this.props.match.params.day_id
              }`}
              variant="outlined"
              className={classes.btn}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </MidGridLayout>
    );
  }
}
DaySummary.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTrips, getTripById }
)(withStyles(styles)(DaySummary));
