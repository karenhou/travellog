import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import withStyles from "@material-ui/core/styles/withStyles";

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
    height: "68vh",
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

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <div>
          <CircularProgress />
        </div>
      );
    } else {
      console.log([profile]);
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <div style={{ marginBottom: "60px" }} />
            <Button
              onClick={() => this.onDeleteClick()}
              variant="contained"
              color="secondary"
              className={classes.button}>
              Delete
              <DeleteIcon />
            </Button>
            <Button
              component={Link}
              to="/add-trip"
              variant="contained"
              color="secondary"
              className={classes.button}>
              Add Trip
              <Icon>add_box</Icon>
            </Button>
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
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h2">Dashboard</Typography>
              {dashboardContent}
            </Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(withStyles(styles)(Dashboard));