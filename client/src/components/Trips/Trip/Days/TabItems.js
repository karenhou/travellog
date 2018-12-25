import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import isEmpty from "../../../../validation/is-empty";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const TabItems = props => {
  let photoContent, cityContent, tabContent;
  if (!isEmpty(props.day.POI)) {
    cityContent = props.day.POI.map((poi, index) => {
      if (!isEmpty(poi.photoLinks)) {
        photoContent = poi.photoLinks.map((photo, i) => {
          return (
            <div key={i}>
              <img
                src={photo}
                alt="photos"
                style={{ width: "300px", height: "300px" }}
              />
            </div>
          );
        });
      }
      return (
        <div key={index}>
          <ListItem button>
            <ListItemText primary={poi.name} secondary={poi.description} />
          </ListItem>
          <Divider />
        </div>
      );
    });

    tabContent = (
      <>
        <Carousel showThumbs={false}>{photoContent}</Carousel>
        <List>{cityContent}</List>
      </>
    );
  } else {
    tabContent = <Typography variant="h5">No POI found</Typography>;
  }

  return tabContent;
};
export default TabItems;
