import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

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
  image: {
    width: 400,
    height: 200
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
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
                  alt="complex"
                  src="https://via.placeholder.com/350x200"
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
                    {trip.from} - {trip.to}
                  </Typography>
                  <Typography gutterBottom>{trip.description}</Typography>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
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
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Trip));
