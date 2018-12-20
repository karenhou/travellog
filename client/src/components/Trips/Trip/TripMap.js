import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GridLayout from "../../layout/GridLayout";
import Typography from "@material-ui/core/Typography";

export class TripMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <GridLayout>
        <Typography variant="h2" align="center">
          Google map
        </Typography>
      </GridLayout>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMap);
