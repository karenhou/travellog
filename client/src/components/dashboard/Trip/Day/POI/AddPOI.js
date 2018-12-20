import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import Geosuggest from "react-geosuggest";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import MidGridLayout from "../../../../layout/MidGridLayout";
import {
  addPOI,
  clearErrors,
  getTripById
} from "../../../../../actions/tripActions";
import isEmpty from "../../../../../validation/is-empty";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 5
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  chip: { marginTop: theme.spacing.unit * 2 }
});

export class AddPOI extends Component {
  state = {
    POI: "",
    POIArray: "",
    photoLinks: "",
    description: "",
    cityContent: "",
    content: "",
    current: ""
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
      const { days } = nextProps.trip.trip;
      if (!isEmpty(days)) {
        days.map(day => {
          if (this.props.match.params.day_id === day._id) {
            day.cities.map(c => {
              if (this.props.match.params.city_id === c._id) {
                this.setState({
                  POIArray: [...c.POI],
                  current: c.name
                });
              }
            });
          }
        });
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleAddPhotoLinks = () => {
    let newArray = [...this.state.photoLinks];
    let c = this.state.content;
    newArray.push(c);
    this.setState({ photoLinks: newArray, content: "" });
  };

  onSuggestSelect = suggest => {
    if (suggest) {
      let newPOI = {
        name: suggest.gmaps.name,
        placeId: suggest.placeId,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      };
      this.setState({
        POI: newPOI,
        cityContent: ""
      });
    }
    this._geoSuggest.clear();
  };

  onSuggestNoResults(noresult) {
    console.log("no result", noresult);
  }
  handleDelete = index => {
    let content = [...this.state.photoLinks];
    content.splice(index, 1);
    this.setState({ photoLinks: [...content] });
  };
  handleCityDelete = index => {
    this.setState({ POI: "" });
  };

  onSubmit = e => {
    e.preventDefault();
    const poiData = {
      name: this.state.POI.name,
      lat: this.state.POI.lat,
      lng: this.state.POI.lng,
      placeId: this.state.POI.placeId,
      description: this.state.description,
      photoLinks: [...this.state.photoLinks]
    };
    this.props.addPOI(
      poiData,
      this.props.match.params.trip_id,
      this.props.match.params.day_id,
      this.props.match.params.city_id,
      this.props.history
    );
  };
  onBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes } = this.props;
    let cityContent, photoContent, POIContent;

    if (this.state.POIArray.length > 0) {
      POIContent = this.state.POIArray.map((poi, i) => (
        <Chip
          className={classes.chip}
          key={i}
          label={poi.name}
          color="secondary"
        />
      ));
    }

    cityContent = this.state.POI ? (
      <Chip
        label={this.state.POI.name}
        onDelete={() => this.handleCityDelete()}
        color="secondary"
      />
    ) : null;

    photoContent = this.state.photoLinks
      ? this.state.photoLinks.map((photo, index) => {
          return (
            <Chip
              key={index}
              label={photo}
              className={classes.chip}
              onDelete={() => this.handleDelete(index)}
              color="secondary"
            />
          );
        })
      : null;
    return (
      <MidGridLayout>
        <Typography variant="h4" color="primary">
          {this.state.current}
        </Typography>
        <p>Added POI</p>
        {POIContent}
        <div>
          <p>Add POI</p>
        </div>
        <form onSubmit={this.onSubmit}>
          <FormControl margin="normal" fullWidth>
            <TextField
              value={this.state.description}
              name="description"
              id="description"
              label="description"
              type="text"
              onChange={this.handleChange("description")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>

          <FormControl margin="normal">
            <FormHelperText>POI</FormHelperText>
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
          <br />
          <FormControl margin="normal">
            <TextField
              error={
                !validator.isURL(this.state.content) &&
                !validator.isEmpty(this.state.content)
              }
              value={this.state.content}
              name="content"
              label="photoLinks"
              type="text"
              onChange={this.handleChange("content")}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      disabled={!validator.isURL(this.state.content)}
                      aria-label="add-photos"
                      onClick={this.handleAddPhotoLinks}>
                      <Icon color="primary">add_circle</Icon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {photoContent}
          </FormControl>
          <Grid justify="flex-end" container space={24}>
            <Grid item />
            <Grid item />
            <Grid item xs={6} md={2}>
              <Button
                disabled={isEmpty(this.state.POI)}
                type="submit"
                variant="contained"
                color="primary">
                Submit
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                component={Link}
                to={`/trip/${this.props.match.params.trip_id}`}
                type="submit"
                variant="contained">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </MidGridLayout>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { addPOI, clearErrors, getTripById }
)(withStyles(styles)(AddPOI));
