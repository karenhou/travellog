import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2.5
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "300px",
    maxHeight: "300px"
  }
});

export class Trip extends Component {
  render() {
    const { trip, classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="loading"
                  src={
                    trip.coverPhoto
                      ? trip.coverPhoto
                      : "https://via.placeholder.com/180"
                  }
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    {trip.country}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    <Moment format="YYYY/MM/DD">{trip.from}</Moment> -
                    <Moment format="YYYY/MM/DD">{trip.to}</Moment>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    by {trip.author}
                  </Typography>
                  <Typography gutterBottom>{trip.description}</Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to={`/trips/${trip._id}/timeline`}
                    type="submit"
                    variant="contained"
                    color="primary">
                    Details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
Trip.propType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trip);
