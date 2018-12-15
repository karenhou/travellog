import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getTripById } from "../../actions/tripActions";
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import isEmpty from "../../validation/is-empty";

const styles = theme => ({
  btn: {
    marginTop: theme.spacing.unit * 2
  },
  carousel: {
    width: "100%"
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

    let photoContent, timeLineItems;
    if (trip.days) {
      timeLineItems = trip.days.map(day => {
        if (isEmpty(day.photoLinks)) {
          photoContent = null;
        } else {
          photoContent = day.photoLinks.map((photo, index) => {
            return (
              <div key={index}>
                <img src={photo} alt="photos" />
              </div>
            );
          });
        }

        return (
          <VerticalTimelineElement
            key={day._id}
            className="vertical-timeline-element--work"
            date={moment.utc(day.date).format("YYYY-MM-DD")}
            iconStyle={{ background: "#80cbc4", color: "#00796b" }}>
            <Typography
              className="vertical-timeline-element-title"
              variant="h3">
              {day.cities.join(",")}
            </Typography>
            <Typography
              className="vertical-timeline-element-subtitle"
              variant="subtitle1">
              {trip.country}
            </Typography>
            <Carousel
              className={classes.carousel}
              showThumbs={false}
              dynamicHeight={true}
              onClickItem={() => this.clicked(day._id)}>
              {photoContent}
            </Carousel>
            <Button
              component={Link}
              to={`/trips/${trip._id}/${day._id}`}
              fullWidth
              variant="contained"
              color="primary">
              More...
            </Button>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <>
        <Grid justify="center" container space={24}>
          <Grid item>
            <Button
              component={Link}
              to="/trips"
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}>
              Back to Trips
            </Button>
          </Grid>
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
