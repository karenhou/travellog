import React, { Component } from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { getTrips } from "../../actions/tripActions";
import TripItems from "./TripItems";

class TripsList extends Component {
  componentDidMount() {
    this.props.getTrips();
  }

  render() {
    const { trips, loading } = this.props.trip;
    let tripItems;

    if (trips === null || loading) {
      tripItems = <CircularProgress />;
    } else {
      if (trips.length > 0) {
        tripItems = trips.map(trip => <TripItems key={trip._id} trip={trip} />);
      } else {
        tripItems = <Typography variant="h2">No trips found...</Typography>;
      }
    }

    return (
      <>
        <Typography variant="h2">Popular Trips</Typography>
        {tripItems}
      </>
    );
  }
}
const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getTrips }
)(TripsList);
