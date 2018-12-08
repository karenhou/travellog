import { ADD_TRIP, GET_TRIPS, TRIP_LOADING } from "../actions/types";

const initialState = {
  trips: [],
  trip: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRIP:
      return {
        ...state,
        trips: [action.payload, ...state.trips]
      };
    case TRIP_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
