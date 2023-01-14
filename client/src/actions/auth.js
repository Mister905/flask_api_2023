import {
  DISPLAY_MODAL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
} from "./types";

import instance from "../utils/axios";

export const load_active_user = () => async (dispatch) => {
  try {
    const res = await instance.get("/auth/load_active_user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login_user = (form_data, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.post("/auth/login", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to login",
          modal_confirmation: "Ok",
        },
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      navigate("/main");
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to login",
        modal_confirmation: "Ok",
      },
    });
  }
};

export const register_user = (form_data, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.post("/auth/register", request_body, config);

    if (res.data.error) {
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: res.data.message,
          modal_confirmation: "Ok",
        },
      });
    } else {
      navigate("/login");
      dispatch({
        type: DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: res.data.message,
          modal_confirmation: "Ok",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modal_title: "Error",
        modal_body: "Unable to complete registration",
        modal_confirmation: "Ok",
      },
    });
  }
};

export const logout_user = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  navigate("/");
};
