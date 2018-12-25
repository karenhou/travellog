import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

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
    const { country } = this.props.trip.trip;

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
        <Grid justify="flex-end" container space={24}>
          <Button
            component={Link}
            to="/dashboard"
            className={classes.funcBtn}
            variant="outlined"
            color="secondary">
            Dashboard
          </Button>
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
