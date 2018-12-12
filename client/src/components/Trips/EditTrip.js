import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTripById } from "../../actions/tripActions";
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

import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

import isEmpty from "../../validation/is-empty";
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
    marginRight: theme.spacing.unit * 5
    // width: 200
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  days: {
    marginTop: theme.spacing.unit * 3
  }
});

class EditTrip extends Component {
  state = {
    country: "",
    from: "",
    to: "",
    budget: "",
    description: "",
    days: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    console.log("edit oprp ", nextProps.trip.trip);
    if (!isEmpty(nextProps.trip.trip)) {
      const trip = nextProps.trip.trip;
      console.log("bf ", trip);

      trip.country = !isEmpty(trip.country) ? trip.country : "";
      trip.from = !isEmpty(trip.from) ? trip.from : "";
      trip.to = !isEmpty(trip.to) ? trip.to : "";
      trip.budget = !isEmpty(trip.budget) ? trip.budget : "";
      trip.description = !isEmpty(trip.description) ? trip.description : "";

      this.setState({
        country: trip.country,
        from: moment(trip.from).format("YYYY-MM-DD"),
        to: moment(trip.to).format("YYYY-MM-DD"),
        budget: trip.budget,
        description: trip.description
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
      console.log("getTripById");
    }
  }
  onSubmit = () => {
    console.log("submited edit trip");
  };

  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;
    console.log("edittrip ", this.props, typeof trip);
    let tripContent;

    if (trip === null || loading) {
      tripContent = (
        <div>
          <CircularProgress />
        </div>
      );
    } else {
      tripContent = (
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="country">country</InputLabel>
            <Input
              className={classes.textField}
              id="country"
              name="country"
              autoFocus
              value={this.state.country}
              //onChange={this.handleChange("country")}
              required
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              name="from"
              id="from"
              label="From"
              type="date"
              defaultValue={this.state.from}
              className={classes.textField}
              //onChange={this.handleChange("from")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              name="to"
              id="to"
              label="To"
              type="date"
              defaultValue={this.state.to}
              className={classes.textField}
              //onChange={this.handleChange("to")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">Budget</InputLabel>
            <Input
              id="adornment-amount"
              value={this.state.budget}
              //onChange={this.handleChange("budget")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Description"
              multiline
              rowsMax="4"
              value={this.state.description}
              //onChange={this.handleChange("description")}
              margin="normal"
            />
          </FormControl>

          <Typography className={classes.days} variant="h6">
            Days
          </Typography>

          <FormControl fullWidth>
            <TextField
              required
              id="outlined-full-width"
              label="Cities"
              placeholder="Placeholder"
              helperText="please separate each entry with a comma"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-full-width"
              label="hotel"
              placeholder="Placeholder"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-full-width"
              label="photoLinks"
              placeholder="Placeholder"
              helperText="please separate each entry with a comma"
              margin="normal"
              variant="outlined"
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
                to="/dashboard"
                type="submit"
                variant="contained"
                className={classes.submit}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h3">Edit Trip</Typography>
              {tripContent}
              {/*  */}
            </Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}
EditTrip.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  trip: state.trip
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTripById }
)(withStyles(styles)(EditTrip));
