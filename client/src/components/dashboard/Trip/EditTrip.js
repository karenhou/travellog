import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import validator from "validator";
import Geosuggest from "react-geosuggest";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";

import { getTripById, editTrip } from "../../../actions/tripActions";
import isEmpty from "../../../validation/is-empty";
import MidGridLayout from "../../layout/MidGridLayout";

const styles = theme => ({
  textField: {
    marginRight: theme.spacing.unit * 5
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
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

  onSuggestSelect = suggest => {
    if (suggest) {
      let newCountry = {
        name: suggest.gmaps.name,
        placeId: suggest.placeId,
        lat: suggest.location.lat,
        lng: suggest.location.lng,
        _id: this.state.country[0]._id
      };
      let newArray = [];
      newArray.push(newCountry);
      this.setState({
        country: [...newArray],
        cityContent: ""
      });
    }
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

  validateFields = () => {
    if (
      this.compareFromTo(this.state.from, this.state.to) ||
      (!validator.isURL(this.state.coverPhoto) &&
        !validator.isEmpty(this.state.coverPhoto))
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { classes } = this.props;
    const { trip, loading } = this.props.trip;

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
          {this.compareFromTo(this.state.from, this.state.to) ? (
            <p style={{ color: "red" }}>To cannot be smaller than From</p>
          ) : null}
          {!validator.isURL(this.state.coverPhoto) &&
          !validator.isEmpty(this.state.coverPhoto) ? (
            <p style={{ color: "red" }}>false URL</p>
          ) : null}
          <FormControl margin="normal">
            <FormHelperText>Country</FormHelperText>
            <Geosuggest
              ref={el => (this._geoSuggest = el)}
              style={{
                input: {
                  width: "300px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottomWidth: "1px",
                  borderBottomColor: "grey"
                }
              }}
              onSuggestSelect={this.onSuggestSelect}
            />
            {!isEmpty(this.state.country[0]) ? (
              <Chip
                label={this.state.country[0].name}
                className={classes.chip}
                color="secondary"
              />
            ) : null}
          </FormControl>
          <br />
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
              error={
                !validator.isURL(this.state.coverPhoto) &&
                !validator.isEmpty(this.state.coverPhoto)
              }
              fullWidth
              label="coverPhoto"
              value={this.state.coverPhoto}
              onChange={this.handleChange("coverPhoto")}
              margin="normal"
            />
          </FormControl>
          {/* <Typography variant="h4">Days</Typography>
          {daysDetailContent} */}
          <Grid justify="flex-end" container space={24}>
            <Grid item />
            <Grid item />
            <Grid item xs={6} md={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.validateFields()}
                className={classes.submit}>
                Save
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
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
      <MidGridLayout>
        <Typography variant="h3">Edit Trip</Typography>
        {tripContent}
      </MidGridLayout>
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
