import { combineReducers } from "@reduxjs/toolkit";
import auth_reducer from "./auth_reducer";
import upload_reducer from "./upload_reducer";

export default combineReducers({
  auth: auth_reducer,
  upload: upload_reducer
});
