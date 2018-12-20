import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class EditPOI extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <p>Edit POI</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPOI);
