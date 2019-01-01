import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3.5,
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
  textField: {
    marginRight: theme.spacing.unit * 5,
    width: 200
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2
  },
  subtitle: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  btn: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

export default WrappedComponent => {
  class gridLayout extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.main}>
          <Grid container spacing={24}>
            <Grid item xs />
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <WrappedComponent {...this.props} />
              </Paper>
            </Grid>
            <Grid item xs />
          </Grid>
        </div>
      );
    }
  }
  return withStyles(styles)(gridLayout);
};
