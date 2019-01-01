import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import isEmpty from "../../../../validation/is-empty";
import { getTripById } from "../../../../actions/tripActions";
import TabItems from "./TabItems";

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
        days.map(d => {
          if (this.props.match.params.day_id === d._id) {
            this.setState({
              day: d
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
    let tabHeadText, tabContent;
    let day = this.state.day;

    if (!isEmpty(day)) {
      tabHeadText = day.cities.map((city, index) => {
        return <Tab key={index} label={city.name} />;
      });

      if (day.cities[this.state.value] !== undefined) {
        tabContent = (
          <>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto">
                {tabHeadText}
              </Tabs>
            </AppBar>
            <TabContainer>
              <TabItems day={day.cities[this.state.value]} />
            </TabContainer>
          </>
        );
      } else {
        tabContent = <Typography variant="h5">no City found</Typography>;
      }
    }
    return (
      <>
        {tabContent}
        <Grid container space={24}>
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
            to={`/trips/${this.props.match.params.trip_id}/timeline`}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}>
            Back to Timeline
          </Button>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip
});
export default connect(
  mapStateToProps,
  { getTripById }
)(DetailDay);
