import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { registerUser } from "../../actions/authActions";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "@material-ui/core/FormHelperText";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    showPassword1: false,
    showPassword2: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword1 = () => {
    this.setState(state => ({ showPassword1: !state.showPassword1 }));
  };
  handleClickShowPassword2 = () => {
    this.setState(state => ({ showPassword2: !state.showPassword2 }));
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { classes, errors } = this.props;

    let errorContent = [];
    if (Object.keys(errors).length !== 0) {
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorContent.push(
            <FormHelperText
              key={key}
              style={{ color: "red" }}
              id="component-error-text">
              {errors[key]}
            </FormHelperText>
          );
        }
      }
    }
    return (
      <>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Name</InputLabel>
            <Input
              onChange={this.handleChange("name")}
              id="name"
              name="name"
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              onChange={this.handleChange("email")}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </FormControl>
          <FormControl
            fullWidth
            required
            className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword1 ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword1}>
                    {this.state.showPassword1 ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            fullWidth
            required
            className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-password">Password again</InputLabel>
            <Input
              id="adornment-password2"
              type={this.state.showPassword2 ? "text" : "password"}
              value={this.state.password2}
              onChange={this.handleChange("password2")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password2 visibility"
                    onClick={this.handleClickShowPassword2}>
                    {this.state.showPassword2 ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errorContent}
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}>
            SignUp
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/"
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Cancel
          </Button>
        </form>
      </>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
