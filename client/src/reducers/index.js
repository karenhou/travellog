import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";
import tripReducer from "./tripReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  trip: tripReducer
});
