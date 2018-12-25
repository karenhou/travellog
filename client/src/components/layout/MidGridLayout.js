import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});
export class MidGridLayout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>{this.props.children}</Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}
MidGridLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MidGridLayout);
