import React from "react";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import isEmpty from "../../../validation/is-empty";

const TabItems = props => {
  const { day } = props;
  let photoContent;
  // if (!isEmpty(day)) {
  //   photoContent = day.photoLinks.map((photo, index) => (
  //     <div key={index}>
  //       <img src={photo} alt="photos" />
  //     </div>
  //   ));
  // }
  return (
    <div>
      <h1>TabItems</h1>
      {/* <Carousel showThumbs={false}>{photoContent}</Carousel>
      <Typography
        align="center"
        variant="h5"
        style={{ alignContent: "center" }}>
        City: {day.cities}
      </Typography>
      <Typography
        align="center"
        variant="h5"
        style={{ alignContent: "center" }}>
        {" "}
        Date:
        {moment.utc(day.date).format("YYYY-MM-DD")}
      </Typography>
      <Typography
        align="center"
        variant="h5"
        style={{ alignContent: "center" }}>
        Hotel: {day.hotel}
      </Typography> */}
    </div>
  );
};
export default TabItems;
