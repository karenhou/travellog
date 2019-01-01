import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validator from "validator";
import moment from "moment";
import { Link } from "react-router-dom";
import Geosuggest from "react-geosuggest";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { addTrip } from "../../../actions/tripActions";

class AddTrip extends Component {
  state = {
    country: "",
    from: "2017-05-24",
    to: "2017-05-25",
    budget: 0,
    description: "",
    coverPhoto: ""
  };

  calDateDiff = (d1, d2) => {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  };

  compareFromTo = (from, to) => {
    var date1 = new Date(from);
    var date2 = new Date(to);
    return date2.getTime() < date1.getTime() ? true : false;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSuggestSelect = suggest => {
    if (suggest) {
      let newCountry = {
        name: suggest.gmaps.name,
        placeId: suggest.placeId,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      };
      this.setState({
        country: newCountry,
        cityContent: ""
      });
    }
  };

  onSuggestNoResults = noresult => {
    this.setState({
      country: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let len = this.calDateDiff(this.state.from, this.state.to);
    let daysArray = [];
    for (let i = 0; i < len; i++) {
      daysArray.push({
        date: moment
          .utc(this.state.from)
          .add(i, "days")
          .format("YYYY-MM-DD")
      });
    }

    const tripData = {
      author: this.props.auth.user.name,
      country: this.state.country,
      from: moment.utc(this.state.from).format("YYYY-MM-DD"),
      to: moment.utc(this.state.to).format("YYYY-MM-DD"),
      length: this.calDateDiff(this.state.from, this.state.to),
      budget: this.state.budget,
      description: this.state.description,
      coverPhoto: this.state.coverPhoto,
      days: [...daysArray]
    };
    this.props.addTrip(tripData, this.props.history);

    this.setState({ description: "" });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  validateFields = () => {
    if (this.state.country === false) {
      return true;
    }
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
    return (
      <>
        <Typography variant="h3">Create Your trip</Typography>
        <Typography gutterBottom variant="subtitle2">
          Let's add your journey to share your experience with the world
        </Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          {this.state.country === false ? (
            <p style={{ color: "red" }}>Must Select a Country</p>
          ) : null}

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
              onSuggestNoResults={this.onSuggestNoResults}
            />
          </FormControl>
          <br />
          <FormControl margin="normal" required>
            <TextField
              error={this.compareFromTo(this.state.from, this.state.to)}
              name="from"
              id="from"
              label="From"
              type="date"
              defaultValue="2017-05-24"
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
              defaultValue="2017-05-25"
              className={classes.textField}
              onChange={this.handleChange("to")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="adornment-amount">Budget</InputLabel>
            <Input
              className={classes.textField}
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
              label="coverPhoto"
              value={this.state.coverPhoto}
              onChange={this.handleChange("coverPhoto")}
              margin="normal"
            />
          </FormControl>
          <Grid justify="flex-end" container space={24}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.validateFields()}
              className={classes.submit}>
              Save
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
AddTrip.propType = {
  addTrip: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTrip }
)(AddTrip);
