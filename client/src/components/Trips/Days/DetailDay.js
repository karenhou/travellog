import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MidGridLayout from "../../layout/MidGridLayout";
import Typography from "@material-ui/core/Typography";
import isEmpty from "../../../validation/is-empty";
import { getTripById } from "../../../actions/tripActions";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabeItems from "./TabItems";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

export class DetailDay extends Component {
  state = {
    day: "",
    value: 0
  };
  componentDidMount() {
    this.props.getTripById(this.props.match.params.trip_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.trip.trip)) {
      const days = nextProps.trip.trip.days;
      if (days !== null) {
        days.map((day, index) => {
          if (this.props.match.params.day_id === day._id) {
            this.setState({
              day: day,
              value: index
            });
          }
        });
      }
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { trip } = this.props.trip;
    const { value } = this.state;
    let tabHeadText, tabContent;

    if (!isEmpty(trip)) {
      tabHeadText = trip.days.map((day, index) => (
        <Tab key={index} label={moment.utc(day.date).format("YYYY-MM-DD")} />
      ));
      tabContent = (
        <TabContainer>
          <TabeItems day={trip.days[value]} />
        </TabContainer>
      );
    }

    return (
      <MidGridLayout>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto">
              {tabHeadText}
            </Tabs>
          </AppBar>
          {tabContent}
        </div>
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
      </MidGridLayout>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getTripById }
)(withStyles(styles)(DetailDay));
