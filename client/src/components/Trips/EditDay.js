import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { editDay, getTripById } from "../../actions/tripActions";
import isEmpty from "../../validation/is-empty";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

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
    marginRight: theme.spacing.unit * 5
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

class EditDay extends Component {
  state = {
    cities: "",
    hotel: "",
    photoLinks: "",
    edit: false,
    id: "",
    date: ""
  };
  componentDidMount() {
    this.props.getTripById(this.props.match.params.trip_id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.trip.trip)) {
      const days = nextProps.trip.trip.days;
      if (days !== null) {
        days.map(day => {
          if (this.props.match.params.day_id === day._id) {
            const cities = day.cities.join(",");
            const links = day.photoLinks.join(",");
            day.hotel = !isEmpty(day.hotel) ? day.hotel : "";
            this.setState({
              cities: cities,
              hotel: day.hotel,
              photoLinks: links,
              date: day.date
            });
          }
        });
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const dayData = {
      date: this.state.date,
      cities: this.state.cities,
      hotel: this.state.hotel,
      photoLinks: this.state.photoLinks
    };
    this.props.editDay(
      dayData,
      this.props.match.params.trip_id,
      this.props.match.params.day_id,
      this.props.history
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h3">Content to your day</Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                value={this.state.cities}
                required
                name="cities"
                id="cities"
                label="cities"
                type="text"
                className={classes.textField}
                onChange={this.handleChange("cities")}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                value={this.state.hotel}
                name="hotel"
                id="hotel"
                label="hotel"
                type="text"
                className={classes.textField}
                onChange={this.handleChange("hotel")}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <TextField
                value={this.state.photoLinks}
                name="photoLinks"
                id="photoLinks"
                label="photoLinks"
                type="text"
                className={classes.textField}
                onChange={this.handleChange("photoLinks")}
                InputLabelProps={{
                  shrink: true
                }}
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
                  to={`/trip/edit-trip/${this.props.match.params.trip_id}`}
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
EditDay.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getTripById, editDay }
)(withStyles(styles)(EditDay));
