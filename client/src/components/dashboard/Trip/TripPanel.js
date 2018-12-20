import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import isEmpty from "../../../validation/is-empty";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  chip: {
    marginRight: theme.spacing.unit * 2
  }
});

function TripPanel(props) {
  const { classes } = props;

  let panelContent, citiesContent;
  if (props.trip.days) {
    panelContent = props.trip.days.map((day, index) => {
      if (!isEmpty(day.cities)) {
        citiesContent = day.cities.map((city, i) => {
          return (
            <Chip
              key={i}
              label={city.name}
              component={Link}
              to={`/trip/${props.trip._id}/${day._id}/${city._id}/add-poi`}
              className={classes.chip}
              color="secondary"
            />
          );
        });
      } else {
        citiesContent = null;
      }
      return (
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {moment.utc(day.date).format("YYYY-MM-DD")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {citiesContent}
            <Tooltip title="add/edit date info">
              <Fab
                component={Link}
                to={`/trip/${props.trip._id}/update-day/${day._id}`}
                size="small"
                aria-label="Edit"
                className={classes.fab}>
                <Icon>edit_icon</Icon>
              </Fab>
            </Tooltip>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  }

  return <div className={classes.root}>{panelContent}</div>;
}

TripPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripPanel);
