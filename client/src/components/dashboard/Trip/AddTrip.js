import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validator from "validator";
import moment from "moment";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { addTrip } from "../../../actions/tripActions";
import GridLayout from "../../layout/GridLayout";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 5,
    width: 200
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
});

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
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <GridLayout>
        <Typography variant="h3">Create Your trip</Typography>
        <Typography gutterBottom variant="subtitle2">
          Let's add your journey to share your experience with the world
        </Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          {this.compareFromTo(this.state.from, this.state.to) ? (
            <p style={{ color: "red" }}>To cannot be smaller than From</p>
          ) : null}
          {!validator.isURL(this.state.coverPhoto) &&
          !validator.isEmpty(this.state.coverPhoto) ? (
            <p style={{ color: "red" }}>false URL</p>
          ) : null}
          <FormControl margin="normal" required>
            <InputLabel htmlFor="country">country</InputLabel>
            <Input
              className={classes.textField}
              id="country"
              name="country"
              autoFocus
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
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </GridLayout>
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
)(withStyles(styles)(AddTrip));
