import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { getTripById } from "../../../actions/tripActions";
import isEmpty from "../../../validation/is-empty";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

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
  },
  btn: {
    width: "100px",
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4.5,
    marginTop: theme.spacing.unit * 1.5
  }
});

export class TripMap extends Component {
  state = {
    POI: "",
    showingInfoWindow: false,
    activeMarker: {},
    country: "",
    city: "",
    cityOn: true,
    poiOn: true,
    lat: "",
    lng: "",
    zoom: 4,
    bound: 0
  };

  componentDidMount() {
    this.props.getTripById(this.props.match.params.trip_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    let POIarray = [];
    let cityArray = [];
    if (!isEmpty(nextProps.trip.trip)) {
      const { days, country } = nextProps.trip.trip;

      if (!isEmpty(country[0].name)) {
        this.setState({
          country: country,
          lat: country[0].lat,
          lng: country[0].lng
        });
      }
      if (!isEmpty(days)) {
        days.forEach(day => {
          day.cities.forEach(city => {
            cityArray.push(city);
            city.POI.forEach(poi => {
              POIarray.push(poi);
            });
          });
        });
      }
    }
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < POIarray.length; i++) {
      bounds.extend({
        lat: parseFloat(POIarray[i].lat),
        lng: parseFloat(POIarray[i].lng)
      });
    }

    this.setState({
      POI: [...POIarray],
      city: [...cityArray],
      bound: bounds
    });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow,
      lat: props.position.lat,
      lng: props.position.lng,
      zoom: 12
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

  onClickAll = () => {
    this.setState({
      poiOn: true,
      cityOn: true,
      showingInfoWindow: false,
      lat: this.state.country[0].lat,
      lng: this.state.country[0].lng,
      zoom: 4
    });
  };

  onClickCities = () => {
    this.setState({ poiOn: !this.state.poiOn, cityOn: true });
  };

  onClickPOIs = () => {
    this.setState({ cityOn: !this.state.cityOn, poiOn: true });
  };

  render() {
    const { classes } = this.props;
    let POIcontent, mapContent, cityContent;

    if (!isEmpty(this.state.city)) {
      cityContent = this.state.city.map((c, ind) => {
        return (
          <Marker
            key={ind}
            title={c.name}
            name={c.name}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/orange.png"
            }}
            position={{ lat: c.lat, lng: c.lng }}
            onClick={this.onMarkerClick}
          />
        );
      });
    }

    if (!isEmpty(this.state.POI)) {
      POIcontent = this.state.POI.map((poi, ind) => {
        return (
          <Marker
            key={ind}
            title={poi.name}
            name={poi.name}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/purple.png"
            }}
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
          zoom={this.state.zoom}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          onClick={this.onMapClicked}
          bounds={this.state.bound}>
          {this.state.poiOn ? POIcontent : null}
          {this.state.cityOn ? cityContent : null}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <Typography variant="subheading">
              {this.state.activeMarker.name}
            </Typography>
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
            <Paper className={classes.paper}>
              <Grid container spacing={24} justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={this.onClickAll}>
                  All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={this.onClickCities}>
                  Cities
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={this.onClickPOIs}>
                  POIs
                </Button>
              </Grid>
              {mapContent}
            </Paper>
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
