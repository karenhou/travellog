import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileActions";
import { withRouter, Link } from "react-router-dom";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  main: {
    flexGrow: 1,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

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
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <h1 className="display-4 text-center">Create Your Profile</h1>
          <p className="lead text-center">
            Let's get some information to make your profile stand out
          </p>
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
              <Grid item />
              <Grid item />
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  ok
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  component={Link}
                  to="/dashboard"
                  type="submit"
                  variant="contained"
                  className={classes.submit}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
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
)(withRouter(withStyles(styles)(CreateProfile)));
