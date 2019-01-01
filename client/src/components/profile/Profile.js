import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfileByHandle,
  deleteAccount
} from "../../actions/profileActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Icon from "@material-ui/core/Icon";

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
        <>
          <Typography gutterBottom variant="h3">
            username: {profile.handle}
          </Typography>
          <Typography gutterBottom variant="h5">
            {profile.location}
          </Typography>
          <Typography gutterBottom variant="h6">
            bio: {profile.bio}
          </Typography>
        </>
      );
    }

    return (
      <>
        <div>
          <Button
            onClick={() => this.onDeleteClick()}
            variant="contained"
            style={{ backgroundColor: "red" }}
            className={classes.btn}>
            Delete
            <Icon>delete</Icon>
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            className={classes.btn}
            color="secondary">
            Dashboard
          </Button>
        </div>

        <Typography variant="h2" className={classes.subtitle}>
          Profile
        </Typography>
        {profileContent}
      </>
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
)(Profile);
