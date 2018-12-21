import axios from "axios";

import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_TRIPS,
  GET_TRIP,
  TRIP_LOADING,
  ADD_TRIP,
  SET_CURRENT_TRIP
} from "./types";

//set loading state
export const setTripLoading = () => {
  return {
    type: TRIP_LOADING
  };
};

//set loading state
export const setCurrentTrip = () => {
  return {
    type: SET_CURRENT_TRIP
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

//get trip by trip_id
export const getTripById = trip_id => dispatch => {
  dispatch(setTripLoading());
  axios
    .get(`/api/trips/${trip_id}`)
    .then(res => dispatch({ type: GET_TRIP, payload: res.data }))
    .catch(err => dispatch({ type: GET_TRIP, payload: null }));
};

// add trip
export const addTrip = (tripData, history) => dispatch => {
  axios
    .post("/api/trips", tripData)
    .then(res => {
      dispatch({ type: ADD_TRIP, payload: res.data });
      history.push(`/trip/${res.data._id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// edit trip
export const editTrip = (tripData, trip_id, history) => dispatch => {
  axios
    .post(`/api/trips/${trip_id}`, tripData)
    .then(res => {
      dispatch({ type: ADD_TRIP, payload: res.data });
      // dispatch(getTripById(trip_id));
      history.push(`/trip/${trip_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//delete trip
export const deleteTrip = (trip_id, user_id) => dispatch => {
  axios
    .delete(`/api/trips/${trip_id}`)
    .then(res => {
      dispatch(getTripsByUserId(user_id));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// Get profile by handle
export const getTripsByUserId = user_id => dispatch => {
  dispatch(setTripLoading());
  axios
    .get(`/api/trips/user/${user_id}`)
    .then(res => {
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TRIPS,
        payload: null
      })
    );
};

// update day
export const updateDay = (dayData, trip_id, day_id, history) => dispatch => {
  axios
    .post(`/api/trips/${trip_id}/${day_id}`, dayData)
    .then(res => history.push(`/trip/${trip_id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add/edit POI
export const addPOI = (
  dayData,
  trip_id,
  day_id,
  city_id,
  history
) => dispatch => {
  axios
    .post(`/api/trips/${trip_id}/${day_id}/${city_id}`, dayData)
    .then(res => {
      history.push(`/trip/${trip_id}/${day_id}/${city_id}/POI`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add/edit POI
export const updatePOI = (
  dayData,
  trip_id,
  day_id,
  city_id,
  history
) => dispatch => {
  axios
    .post(`/api/trips/${trip_id}/${day_id}/${city_id}/update`, dayData)
    .then(res => {
      history.push(`/trip/${trip_id}/${day_id}/${city_id}/POI`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete POI
export const deletePOI = (
  dayData,
  trip_id,
  day_id,
  city_id,
  history
) => dispatch => {
  axios
    .post(`/api/trips/${trip_id}/${day_id}/${city_id}/update`, dayData)
    .then(res => {
      //history.push(`/trip/${trip_id}/${day_id}/${city_id}/POI`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
