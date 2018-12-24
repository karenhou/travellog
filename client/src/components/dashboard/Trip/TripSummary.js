import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getTrips, getTripById } from "../../../actions/tripActions";
import isEmpty from "../../../validation/is-empty";
import MidGridLayout from "../../layout/MidGridLayout";
import TripPanel from "./TripPanel";

const styles = theme => ({
  btn: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  funcBtn: {
    marginTop: theme.spacing.unit * 3
  },
  fab: {
    marginLeft: theme.spacing.unit * 2
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

  handleCityDelete = index => {
    console.log("delete clicked in trip summ ", index);
  };
  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;
    const { country } = this.props.trip.trip;
    let daysDetailContent = [];

    if (trip === null || loading) {
      daysDetailContent = <CircularProgress />;
    } else {
      if (!isEmpty(trip)) {
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
        <Typography variant="h4" gutterBottom>
          {!isEmpty(country) ? country[0].name : null}
          <Tooltip title="edit Trip info">
            <Fab
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}/edit-trip`}
              size="small"
              aria-label="Edit"
              className={classes.fab}>
              <Icon>edit_icon</Icon>
            </Fab>
          </Tooltip>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          click city chips to add/edit POIs
        </Typography>
        <TripPanel
          trip={this.props.trip.trip}
          onDelete={this.handleCityDelete}
        />
        <Grid container space={24}>
          <Grid item xs={12} md={3}>
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