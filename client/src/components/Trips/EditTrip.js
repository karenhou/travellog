import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTripsByUserId } from "../../actions/tripActions";
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
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2.5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

class EditTrip extends Component {
  componentDidMount() {
    if (this.props.auth.user.id) {
      this.props.getTripsByUserId(this.props.match.params.trip_id);
    }
  }
  onSubmit = () => {
    console.log("submited edit trip");
  };

  render() {
    const { classes } = this.props;
    console.log("edittrip ", this.props);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h3">Edit Trip</Typography>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required>
                  <InputLabel htmlFor="country">country</InputLabel>
                  <Input
                    className={classes.textField}
                    id="country"
                    name="country"
                    autoFocus
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
                    defaultValue="2017-05-24"
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
                    defaultValue="2017-05-25"
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
                    // value={this.state.budget}
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
                    // value={this.state.description}
                    //onChange={this.handleChange("description")}
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
  { getTripsByUserId }
)(withStyles(styles)(EditTrip));
