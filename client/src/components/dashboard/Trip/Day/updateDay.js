import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";

import {
  updateDay,
  getTripById,
  clearErrors
} from "../../../../actions/tripActions";
import isEmpty from "../../../../validation/is-empty";

class UpdateDay extends Component {
  state = {
    cities: "",
    hotel: "",
    schedule: "",
    date: "",
    content: "",
    cityContent: "",
    POI: ""
  };
  componentDidMount() {
    this.props.clearErrors();
    this.props.getTripById(this.props.match.params.trip_id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.trip.trip)) {
      const days = nextProps.trip.trip.days;
      if (days !== null) {
        days.forEach(day => {
          if (this.props.match.params.day_id === day._id) {
            day.hotel = !isEmpty(day.hotel) ? day.hotel : "";
            this.setState({
              cities: [...day.cities],
              hotel: day.hotel,
              date: day.date,
              schedule: day.schedule
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
      cities: [...this.state.cities],
      hotel: this.state.hotel,
      schedule: this.state.schedule
    };
    this.props.updateDay(
      dayData,
      this.props.match.params.trip_id,
      this.props.match.params.day_id,
      this.props.history
    );
  };

  handleAddCity = () => {
    let newArray = [...this.state.cities];
    let c = this.state.cityContent;
    newArray.push(c);
    this.setState({ cities: newArray, cityContent: "" });
  };

  handleAddPhotoLinks = () => {
    let newArray = [...this.state.photoLinks];
    let c = this.state.content;
    newArray.push(c);
    this.setState({ photoLinks: newArray, content: "" });
  };

  handleDelete = index => {
    let content = [...this.state.photoLinks];
    content.splice(index, 1);
    this.setState({ photoLinks: [...content] });
  };
  handleCityDelete = index => {
    let content = [...this.state.cities];
    content.splice(index, 1);
    this.setState({ cities: [...content] });
  };

  onSuggestSelect = suggest => {
    if (suggest) {
      let newArray = [...this.state.cities];
      newArray.push({
        name: suggest.gmaps.name,
        placeId: suggest.placeId,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      });
      this.setState({ cities: newArray, cityContent: "" });
      this._geoSuggest.clear();
    }
  };
  onSuggestNoResults(noresult) {
    console.log("no result", noresult);
  }

  render() {
    const { classes, errors } = this.props;
    let cityContent;

    cityContent = this.state.cities
      ? this.state.cities.map((city, index) => {
          return (
            <Chip
              key={index}
              label={city.name}
              onDelete={() => this.handleCityDelete(index)}
              className={classes.chip}
              color="secondary"
            />
          );
        })
      : null;

    return (
      <>
        <Typography variant="h3">Edit Day</Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormHelperText style={{ color: "red" }} id="component-error-text">
            {isEmpty(errors) ? "" : "**" + errors[Object.keys(errors)]}
          </FormHelperText>
          <FormControl margin="normal">
            <FormHelperText>Cities</FormHelperText>
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
            {cityContent}
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <TextField
              value={this.state.hotel}
              name="hotel"
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
              value={this.state.schedule}
              name="schedule"
              label="schedule"
              type="text"
              multiline
              className={classes.textField}
              onChange={this.handleChange("schedule")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>

          <Grid justify="flex-end" container space={24}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}>
              Submit
            </Button>
            <Button
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}`}
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
UpdateDay.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTripById, updateDay, clearErrors }
)(UpdateDay);
