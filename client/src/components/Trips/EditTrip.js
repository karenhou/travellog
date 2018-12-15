import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTripById, editTrip } from "../../actions/tripActions";
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
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
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
    coverPhoto: "",
    days: "",
    error: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.trip.trip)) {
      const trip = nextProps.trip.trip;

      trip.country = !isEmpty(trip.country) ? trip.country : "";
      trip.from = !isEmpty(trip.from) ? trip.from : "";
      trip.to = !isEmpty(trip.to) ? trip.to : "";
      trip.budget = !isEmpty(trip.budget) ? trip.budget : "";
      trip.description = !isEmpty(trip.description) ? trip.description : "";
      trip.coverPhoto = !isEmpty(trip.coverPhoto) ? trip.coverPhoto : "";
      this.setState({
        country: trip.country,
        from: trip.from,
        to: trip.to,
        budget: trip.budget,
        description: trip.description,
        coverPhoto: trip.coverPhoto
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }

  calDateDiff = (d1, d2) => {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  compareFromTo = (from, to) => {
    var date1 = new Date(from);
    var date2 = new Date(to);
    return date2.getTime() < date1.getTime() ? true : false;
  };

  onSubmit = e => {
    e.preventDefault();
    let tempTripFrom = this.props.trip.trip.from;
    let tempTripTo = this.props.trip.trip.to;
    let newDayArray = [...this.props.trip.trip.days];
    let count = this.calDateDiff(this.state.from, tempTripFrom);

    if (this.state.from < tempTripFrom) {
      //add one day
      for (let i = 0; i < count; i++) {
        newDayArray.unshift({
          date: moment
            .utc(tempTripFrom)
            .subtract(i + 1, "days")
            .format()
        });
      }
    } else if (this.state.from > tempTripFrom) {
      for (let i = 0; i < count; i++) {
        //minus one day
        newDayArray.shift();
      }
    }

    count = this.calDateDiff(this.state.to, tempTripTo);
    if (this.state.to < tempTripTo) {
      //add one day
      for (let i = 0; i < count; i++) {
        newDayArray.pop();
      }
    } else if (this.state.to > tempTripTo) {
      for (let i = 0; i < count; i++) {
        newDayArray.push({
          date: moment
            .utc(tempTripTo)
            .add(i + 1, "days")
            .format()
        });
      }
    }

    const tripData = {
      country: this.state.country,
      from: this.state.from,
      to: this.state.to,
      budget: this.state.budget,
      description: this.state.description,
      coverPhoto: this.state.coverPhoto,
      days: [...newDayArray]
    };
    this.props.editTrip(
      tripData,
      this.props.match.params.trip_id,
      this.props.history
    );
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;

    let tripContent;
    let daysDetailContent = [];

    if (trip === null || loading) {
      tripContent = (
        <div>
          <CircularProgress />
        </div>
      );
      daysDetailContent = (
        <div>
          <CircularProgress />
        </div>
      );
    } else {
      if (trip.days) {
        daysDetailContent = trip.days.map((day, index) => (
          <Button
            key={index}
            component={Link}
            to={`/${this.props.match.params.trip_id}/edit-day/${day._id}`}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary">
            {moment.utc(day.date).format("YYYY-MM-DD")}
          </Button>
        ));
      } else {
        daysDetailContent = <h4>No day found...</h4>;
      }

      tripContent = (
        <form className={classes.form} onSubmit={this.onSubmit}>
          {this.compareFromTo(this.state.from, this.state.to) ? (
            <p style={{ color: "red" }}>To cannot be smaller than From</p>
          ) : null}
          <FormControl margin="normal" required>
            <InputLabel htmlFor="country">country</InputLabel>
            <Input
              className={classes.textField}
              id="country"
              name="country"
              autoFocus
              value={this.state.country}
              onChange={this.handleChange("country")}
              required
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              error={this.compareFromTo(this.state.from, this.state.to)}
              name="from"
              id="from"
              label="From"
              type="date"
              defaultValue={moment.utc(trip.from).format("YYYY-MM-DD")}
              className={classes.textField}
              onChange={this.handleChange("from")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              error={this.compareFromTo(this.state.from, this.state.to)}
              name="to"
              id="to"
              label="To"
              type="date"
              defaultValue={moment.utc(trip.to).format("YYYY-MM-DD")}
              className={classes.textField}
              onChange={this.handleChange("to")}
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
              onChange={this.handleChange("budget")}
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
              onChange={this.handleChange("description")}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="coverPhoto"
              value={this.state.coverPhoto}
              onChange={this.handleChange("coverPhoto")}
              margin="normal"
            />
          </FormControl>
          <Typography variant="h4">Days</Typography>
          {daysDetailContent}
          <Grid justify="flex-end" container space={24}>
            <Grid item />
            <Grid item />
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.compareFromTo(this.state.from, this.state.to)}
                className={classes.submit}>
                Save
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={Link}
                to="/dashboard"
                type="submit"
                variant="contained"
                className={classes.submit}>
                Dashboard
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

export default connect(
  mapStateToProps,
  { getTripById, editTrip }
)(withStyles(styles)(EditTrip));
