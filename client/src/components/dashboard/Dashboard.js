import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getTripsByUserId } from "../../actions/tripActions";
import withStyles from "@material-ui/core/styles/withStyles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import TripTable from "./TripTable";
import GridLayout from "../layout/GridLayout";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    if (this.props.auth.user.id) {
      this.props.getTripsByUserId(this.props.auth.user.id);
    }
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { trips } = this.props.trip;
    const { classes } = this.props;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <div>
          <CircularProgress />
        </div>
      );
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <Button
              component={Link}
              to="/add-trip"
              variant="contained"
              color="secondary"
              className={classes.button}>
              Add Trip
              <Icon>add_box</Icon>
            </Button>
            {trips.length > 0 ? <TripTable /> : null}
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <GridLayout>
        <Typography variant="h2">Dashboard</Typography>
        {dashboardContent}
      </GridLayout>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getTripsByUserId }
)(withStyles(styles)(Dashboard));
