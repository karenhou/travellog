import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { getTripById } from "../../../actions/tripActions";
import isEmpty from "../../../validation/is-empty";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    height: "80vh",
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2.5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  map: {
    position: "relative !important"
  }
});

export class TripMap extends Component {
  state = {
    POI: "",
    showingInfoWindow: false,
    activeMarker: {},
    country: ""
  };

  componentDidMount() {
    this.props.getTripById(this.props.match.params.trip_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    let POIarray = [];
    if (!isEmpty(nextProps.trip.trip)) {
      const { days, country } = nextProps.trip.trip;
      if (!isEmpty(country[0].name)) {
        this.setState({
          country: country
        });
      }
      if (!isEmpty(days)) {
        days.map(day => {
          day.cities.map(city => {
            city.POI.map(poi => {
              POIarray.push(poi);
            });
          });
        });
      }
    }
    this.setState({
      POI: [...POIarray]
    });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  };
  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: !this.state.showingInfoWindow
        // activeMarker: null
      });
    }
  };
  centerMoved = (mapProps, map) => {
    console.log(mapProps, map);
  };

  render() {
    const { classes } = this.props;
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.POI.length; i++) {
      bounds.extend({
        lat: parseFloat(this.state.POI[i].lat),
        lng: parseFloat(this.state.POI[i].lng)
      });
    }
    let POIcontent, mapContent;

    if (!isEmpty(this.state.POI)) {
      POIcontent = this.state.POI.map((poi, ind) => {
        return (
          <Marker
            key={ind}
            title={poi.name}
            name={poi.name}
            position={{ lat: poi.lat, lng: poi.lng }}
            onClick={this.onMarkerClick}
          />
        );
      });
    }
    if (!isEmpty(this.state.country)) {
      mapContent = (
        <Map
          className={classes.map}
          google={this.props.google}
          zoom={7}
          initialCenter={{
            lat: this.state.country[0].lat,
            lng: this.state.country[0].lng
          }}
          onClick={this.onMapClicked}
          bounds={bounds}>
          {POIcontent}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.activeMarker.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
    } else {
      mapContent = <CircularProgress />;
    }

    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={10}>
            <Paper className={classes.paper}>{mapContent}</Paper>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getTripById }
)(
  withStyles(styles)(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0AbphMOhr1wveT2T-x8EbazsgwtC7ONc"
    })(TripMap)
  )
);
