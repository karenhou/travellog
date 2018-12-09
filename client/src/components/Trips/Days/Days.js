import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { getTrips, getTripById } from "../../../actions/tripActions";

import Trip from "../Trip";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 5,
    width: 200
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

class Days extends Component {
  componentDidMount() {
    this.props.getTrips();
    console.log(this.props);
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }
  render() {
    const { classes } = this.props;
    const { trip } = this.props.trip;
    return (
      <main className={classes.main}>
        {/* <Trip trip={trip} /> */}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h3">{trip.country} Trip Created...</Typography>
          <p className="lead text-center">
            Let's add details to each day of your journey
          </p>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required>
              <InputLabel htmlFor="country">country</InputLabel>
              <Input
                className={classes.textField}
                id="country"
                name="country"
                autoFocus
                //onChange={this.handleChange("country")}
                required
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

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTrips, getTripById }
)(withStyles(styles)(Days));
