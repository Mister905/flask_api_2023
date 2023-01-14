import {
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  GET_ABOUT,
  UPDATE_ABOUT,
} from "../actions/types";

const initial_state = {
  access_token: localStorage.getItem("token"),
  is_authenticated: false,
  loading_user: true,
  loading_about: true,
  user: null,
  is_activated: false
};

export default function (state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        is_authenticated: true,
        loading_user: false,
        user: payload.user,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.access_token);
      return {
        ...state,
        access_token: payload.access_token,
        is_authenticated: true,
        loading_user: false,
        user: payload.user,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        access_token: null,
        is_authenticated: false,
        user: null,
        loading_user: true,
      };
    default:
      return state;
  }
}
