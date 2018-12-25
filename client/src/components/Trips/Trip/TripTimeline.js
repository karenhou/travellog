import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getTripById } from "../../../actions/tripActions";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import moment from "moment";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  btn: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

export class TripTimeline extends Component {
  componentDidMount() {
    this.props.getTripById(this.props.match.params.trip_id);
  }

  clicked = day_id => {
    this.props.history.push(
      `/trips/${this.props.match.params.trip_id}/${day_id}`
    );
  };
  render() {
    const { classes } = this.props;
    const { trip } = this.props.trip;
    let timeLineItems, cityContent;
    if (trip.days) {
      timeLineItems = trip.days.map(day => {
        cityContent = day.cities.map(city => city.name + ", ");
        // console.log("check city ", day);
        return (
          <VerticalTimelineElement
            key={day._id}
            className="vertical-timeline-element--work"
            date={moment.utc(day.date).format("YYYY-MM-DD")}
            iconStyle={{ background: "#80cbc4", color: "#00796b" }}>
            <Typography
              className="vertical-timeline-element-title"
              color="primary"
              variant="h5">
              {cityContent}
            </Typography>
            <Typography
              className="vertical-timeline-element-subtitle"
              variant="subtitle1"
              color="secondary">
              {trip.country[0].name}
            </Typography>
            <Typography
              className="vertical-timeline-element-subtitle"
              variant="subtitle1">
              <i className="fas fa-hotel" style={{ marginRight: "5px" }} />
              {day.hotel}
            </Typography>
            <Typography
              className="vertical-timeline-element-subtitle"
              variant="subtitle1">
              {day.schedule}
            </Typography>
            <Button
              component={Link}
              to={`/trips/${trip._id}/${day._id}/details`}
              fullWidth
              variant="contained"
              color="primary">
              Details...
            </Button>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <>
        <Grid justify="center" container space={24}>
          <Button
            component={Link}
            to="/trips"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}>
            Back to Trips
          </Button>
          <Button
            component={Link}
            to={`/trips/${trip._id}/map`}
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary">
            Go to Map
          </Button>
        </Grid>
        <VerticalTimeline>{timeLineItems}</VerticalTimeline>
      </>
    );
  }
}
TripTimeline.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getTripById }
)(withStyles(styles)(TripTimeline));
