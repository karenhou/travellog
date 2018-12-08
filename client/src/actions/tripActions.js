import axios from "axios";

import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_TRIPS,
  TRIP_LOADING,
  ADD_TRIP
} from "./types";

//set loading state
export const setTripLoading = () => {
  return {
    type: TRIP_LOADING
  };
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//get all trips
export const getTrips = () => dispatch => {
  dispatch(setTripLoading());
  axios
    .get("/api/trips")
    .then(res => dispatch({ type: GET_TRIPS, payload: res.data }))
    .catch(err => dispatch({ type: GET_TRIPS, payload: null }));
};

// add trip
export const addTrip = (tripData, history) => dispatch => {
  axios
    .post("/api/trips", tripData)
    .then(res => dispatch({ type: ADD_TRIP, payload: res.data }))
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
