import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MidGridLayout from "../../../layout/MidGridLayout";
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
    let tripContent, cityContent, poiContent;
    let day = this.state.day;
    if (!isEmpty(day)) {
      tabHeadText = day.cities.map((city, index) => {
        return <Tab key={index} label={city.name} />;
      });
      tabContent = (
        <TabContainer>
          <TabItems key={value} day={day.cities[value]} />
        </TabContainer>
      );
      // tabContent = (
      //   <TabContainer>
      //     <TabeItems day={trip.days[value]} />
      //   </TabContainer>
      // );
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
              {/* {cityContent} */}
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
