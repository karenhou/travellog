import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { addDay, getTripById, clearErrors } from "../../../actions/tripActions";
import isEmpty from "../../../validation/is-empty";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MidGridLayout from "../../layout/MidGridLayout";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import validator from "validator";
import FormHelperText from "@material-ui/core/FormHelperText";

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

class AddDay extends Component {
  state = {
    cities: "",
    hotel: "",
    photoLinks: "",
    edit: false,
    id: "",
    date: "",
    content: "",
    cityContent: ""
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
        days.map(day => {
          if (this.props.match.params.day_id === day._id) {
            day.hotel = !isEmpty(day.hotel) ? day.hotel : "";
            this.setState({
              cities: [...day.cities],
              hotel: day.hotel,
              photoLinks: [...day.photoLinks],
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
      cities: [...this.state.cities],
      hotel: this.state.hotel,
      photoLinks: [...this.state.photoLinks]
    };
    this.props.addDay(
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

  render() {
    const { classes, errors } = this.props;
    let photoContent, cityContent;

    cityContent = this.state.cities
      ? this.state.cities.map((city, index) => {
          return (
            <Chip
              key={index}
              label={city}
              onDelete={() => this.handleCityDelete(index)}
              className={classes.chip}
              color="secondary"
            />
          );
        })
      : null;

    photoContent = this.state.photoLinks
      ? this.state.photoLinks.map((photo, index) => {
          return (
            <Chip
              key={index}
              label={photo}
              onDelete={() => this.handleDelete(index)}
              className={classes.chip}
              color="secondary"
            />
          );
        })
      : null;
    return (
      <MidGridLayout>
        <Typography variant="h3">Content to your day</Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormHelperText style={{ color: "red" }} id="component-error-text">
            {isEmpty(errors) ? "" : "**" + errors[Object.keys(errors)]}
          </FormHelperText>
          <FormControl margin="normal">
            <TextField
              value={this.state.cityContent}
              name="cityContent"
              label="cities*"
              type="text"
              className={classes.textField}
              onChange={this.handleChange("cityContent")}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      aria-label="add-cities"
                      onClick={this.handleAddCity}>
                      <Icon className={classes.icon} color="primary">
                        add_circle
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {cityContent}
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

          <FormControl margin="normal">
            <TextField
              value={this.state.content}
              name="content"
              label="photoLinks"
              type="text"
              className={classes.textField}
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
                      <Icon className={classes.icon} color="primary">
                        add_circle
                      </Icon>
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
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={Link}
                to={`/trip/${this.props.match.params.trip_id}`}
                type="submit"
                variant="contained"
                className={classes.submit}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </MidGridLayout>
    );
  }
}
AddDay.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth,
  errors: state.errors
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTripById, addDay, clearErrors }
)(withStyles(styles)(AddDay));
