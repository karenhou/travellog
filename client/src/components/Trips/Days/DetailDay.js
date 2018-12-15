import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GridLayout from "../../layout/GridLayout";
import Typography from "@material-ui/core/Typography";

export class DetailDay extends Component {
  render() {
    return (
      <GridLayout>
        <Typography variant="h2">DetailDays</Typography>
      </GridLayout>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailDay);
