import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileActions";
import { withRouter, Link } from "react-router-dom";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    location: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { classes } = this.props;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          {/* <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          /> */}
        </div>
      );
    }

    return (
      <>
        <Typography variant="h3">Create Your Profile</Typography>
        <Typography gutterBottom variant="subtitle1">
          Let's get some information to make your profile stand out
        </Typography>

        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Handle</InputLabel>
            <Input
              id="handle"
              name="handle"
              autoFocus
              onChange={this.handleChange("handle")}
              required
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="location">Location</InputLabel>
            <Input
              id="location"
              name="location"
              onChange={this.handleChange("location")}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="location">Bio</InputLabel>
            <Input
              id="bio"
              name="bio"
              multiline
              onChange={this.handleChange("bio")}
            />
          </FormControl>
          <Grid justify="flex-end" container space={24}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}>
              ok
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              type="submit"
              variant="contained"
              className={classes.submit}>
              Cancel
            </Button>
          </Grid>
        </form>
      </>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
