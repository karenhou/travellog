import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1
  },
  barHeight: {
    color: "grey",
    backgroundColor: "#00796b",
    height: "10vh"
  }
};

const MyFooter = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.barHeight}>
          <Typography variant="h6" color="inherit">
            Footers
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

MyFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyFooter);
