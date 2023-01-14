import { combineReducers } from "@reduxjs/toolkit";
import auth_reducer from "./auth_reducer";

export default combineReducers({
  auth: auth_reducer,
});
