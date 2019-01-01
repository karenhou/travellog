import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  clearErrors,
  getTripById,
  deletePOI
} from "../../../../../actions/tripActions";
import isEmpty from "../../../../../validation/is-empty";

export class PoiLists extends Component {
  state = {
    POI: "",
    POIArray: "",
    photoLinks: "",
    description: "",
    cityContent: "",
    content: "",
    current: ""
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.auth.user.id) {
      this.props.getTripById(this.props.match.params.trip_id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (!isEmpty(nextProps.trip.trip)) {
      const { days } = nextProps.trip.trip;
      if (!isEmpty(days)) {
        days.map(day => {
          if (this.props.match.params.day_id === day._id) {
            day.cities.map(c => {
              if (this.props.match.params.city_id === c._id) {
                this.setState({
                  POIArray: [...c.POI],
                  current: c.name
                });
              }
            });
          }
        });
      }
    }
  }

  handleDelete = index => {
    let content = [...this.state.POIArray];
    content.splice(index, 1);
    this.setState({ POIArray: [...content] });

    this.props.deletePOI(
      content,
      this.props.match.params.trip_id,
      this.props.match.params.day_id,
      this.props.match.params.city_id,
      this.props.history
    );
  };

  render() {
    const { classes } = this.props;
    let POIContent;
    if (!isEmpty(this.state.POIArray)) {
      POIContent = this.state.POIArray.map((poi, i) => {
        return (
          <div key={i}>
            <Chip
              className={classes.chip}
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}/${
                this.props.match.params.day_id
              }/${this.props.match.params.city_id}/POI/${poi._id}`}
              label={poi.name}
              variant="outlined"
            />
            <Tooltip title="delete POI">
              <IconButton
                className={classes.button}
                aria-label="Delete"
                color="secondary"
                onClick={() => this.handleDelete(i)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      });
    } else {
      POIContent = <Typography variant="subtitle1" className={classes.title} />;
    }
    return (
      <>
        <Typography variant="h4" color="primary" className={classes.title}>
          {this.state.current}'s POI
          <Tooltip title="Add New POI">
            <Fab
              component={Link}
              to={`/trip/${this.props.match.params.trip_id}/${
                this.props.match.params.day_id
              }/${this.props.match.params.city_id}/POI/add`}
              size="small"
              aria-label="add"
              className={classes.fab}>
              <Icon>add_icon</Icon>
            </Fab>
          </Tooltip>
        </Typography>
        {isEmpty(this.state.POIArray) ? (
          <Typography variant="subtitle2" className={classes.title}>
            Click add button to add POI
          </Typography>
        ) : (
          <Typography variant="subtitle2" className={classes.title}>
            click each chip to modify POI or add button to add POI
          </Typography>
        )}

        {POIContent}
        <Grid justify="flex-end" container space={24} className={classes.grid}>
          <Button
            component={Link}
            to={`/dashboard`}
            type="submit"
            variant="contained"
            className={classes.submit}
            color="secondary">
            Dashboard
          </Button>
          <Button
            component={Link}
            to={`/trip/${this.props.match.params.trip_id}`}
            type="submit"
            variant="contained"
            className={classes.submit}
            color="secondary">
            TripOverView
          </Button>
        </Grid>
      </>
    );
  }
}
PoiLists.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { clearErrors, getTripById, deletePOI }
)(PoiLists);
