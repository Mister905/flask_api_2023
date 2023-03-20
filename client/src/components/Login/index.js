import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login_user } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldProps, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(login_user(values, navigate));
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 center-align">
          <h1>Login</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="email" className="active custom-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={errors.email ? "invalid" : ""}
              {...getFieldProps("email")}
            />
            {errors.email && (
              <span className="custom-helper-error">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="password" className="active custom-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={errors.password ? "invalid" : ""}
              {...getFieldProps("password")}
            />
            {errors.password && (
              <span className="custom-helper-error">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col m4 offset-m4">
            <button type="submit" className="btn right">
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="row registration-row">
        <div className="col m12">
          <div className="center-align">
            New User? <Link to={"/register"} className="register-today">Register Today</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
