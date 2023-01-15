import {
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  USER_ACTIVATED,
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
    console.log(error);
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
      console.log(res.data.message);
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      navigate("/main");
    }
  } catch (error) {
    console.log(error);
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
      console.log(res.data.message);
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

// export const logout_user = (navigate) => async (dispatch) => {
//   try {
//     const res = await instance.post("/auth/logout");

//     if (res.data.error) {
//       console.log(res.data.error);
//     } else {
//       dispatch({ type: LOGOUT });
//       navigate("/");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const logout_user = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  navigate("/");
};

export const activate_user = (user_id) => async (dispatch) => {
  try {
    const res = await instance.get(`/auth/activate/${user_id}`);

    dispatch({
      type: USER_ACTIVATED,
    });
  } catch (error) {
    console.log(error);
  }
};
