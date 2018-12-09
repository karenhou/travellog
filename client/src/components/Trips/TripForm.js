import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrip } from "../../actions/tripActions";
import moment from "moment";

import { Link } from "react-router-dom";

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

class TripForm extends Component {
  state = {
    country: "",
    from: "2017-05-24",
    to: "2017-05-25",
    budget: 0,
    description: ""
  };

  calDateDiff = (d1, d2) => {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const tripData = {
      country: this.state.country,
      from: moment(this.state.from).format("YYYY-MM-DD"),
      to: moment(this.state.to).format("YYYY-MM-DD"),
      length: this.calDateDiff(this.state.from, this.state.to),
      budget: this.state.budget,
      description: this.state.description,
      days: new Array(this.calDateDiff(this.state.from, this.state.to))
    };

    this.props.addTrip(tripData, this.props.history);
    // this.props.history.push(`/add-days/${}`)
    this.setState({ description: "" });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h3">Create Your trip</Typography>
          <p className="lead text-center">
            Let's add your journey to share your experience with the world
          </p>
          <form className={classes.form} onSubmit={this.onSubmit}>
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
TripForm.propType = {
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
)(withStyles(styles)(TripForm));
