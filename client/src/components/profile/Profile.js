import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfileByHandle,
  deleteAccount
} from "../../actions/profileActions";
import withStyles from "@material-ui/core/styles/withStyles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
    alignItems: "left",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  button: {
    marginBottom: "20px",
    margin: theme.spacing.unit
  }
});

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <CircularProgress />;
    } else {
      profileContent = (
        <div>
          <h1>{profile.handle}</h1>
          <p>{profile.location}</p>
          <p>{profile.bio}</p>
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs={2}>
                  <Button
                    onClick={() => this.onDeleteClick()}
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    className={classes.button}>
                    Delete
                    <Icon>delete</Icon>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    className={classes.button}
                    color="secondary">
                    Dashboard
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="h2">Profile</Typography>
              {profileContent}
            </Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, deleteAccount }
)(withStyles(styles)(Profile));
