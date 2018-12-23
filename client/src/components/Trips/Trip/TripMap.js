import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import Typography from "@material-ui/core/Typography";

import { getTripById } from "../../../actions/tripActions";
import GridLayout from "../../layout/GridLayout";
import isEmpty from "../../../validation/is-empty";

const style = {
  width: "100%",
  height: "100%"
};

export class TripMap extends Component {
  state = {
    POI: "",
    showingInfoWindow: false,
    activeMarker: {}
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
      const { days } = nextProps.trip.trip;

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

  render() {
    const { days } = this.props.trip.trip;
    let POIcontent;

    // console.log("POI = ", this.state.POI);
    if (!isEmpty(this.state.POI)) {
      POIcontent = this.state.POI.map((poi, ind) => {
        return (
          <Marker
            key={ind}
            title={"test"}
            name={poi.name}
            position={{ lat: poi.lat, lng: poi.lng }}
            onClick={this.onMarkerClick}
          />
        );
      });
    }
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.POI.length; i++) {
      bounds.extend({
        lat: parseFloat(this.state.POI[i].lat),
        lng: parseFloat(this.state.POI[i].lng)
      });
    }
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        initialCenter={{
          lat: 25.105497,
          lng: 121.597366
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
  }
}
TripMap.propType = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTripById }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyD0AbphMOhr1wveT2T-x8EbazsgwtC7ONc"
  })(TripMap)
);
