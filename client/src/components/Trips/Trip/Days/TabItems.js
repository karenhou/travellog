import React from "react";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";

import isEmpty from "../../../../validation/is-empty";

const TabItems = props => {
  const { POI } = props.day;
  let photoContent, cityContent, poiContent;
  let photoArray = [];

  console.log("POI", POI);
  if (!isEmpty(POI)) {
    cityContent = POI.map((poi, index) => {
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
          <Typography variant="h5">{poi.name}</Typography>
          <Typography variant="subtitle2">{poi.description}</Typography>
          <br />
        </div>
      );
    });
    poiContent = POI.map(poi => {
      return poi.name + " ";
    });
  } else {
  }
  return (
    <div>
      {!isEmpty(POI) ? (
        <>
          <Carousel showThumbs={false}>{photoContent}</Carousel>
          {cityContent}
        </>
      ) : (
        <Typography variant="h5">No POI found...</Typography>
      )}
    </div>
  );
};
export default TabItems;
