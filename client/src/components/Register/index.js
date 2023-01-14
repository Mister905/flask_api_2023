import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register_user } from "../../actions/auth";
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldProps, errors } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is Required"),
      last_name: Yup.string().required("Last Name is Required"),
      email: Yup.string().email("Invalid email").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(register_user(values, navigate));
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 center-align">
          <h1>Register</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="first_name" className="active custom-label">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className={errors.first_name ? "invalid" : ""}
              {...getFieldProps("first_name")}
            />
            {errors.first_name && (
              <span className="custom-helper-error">{errors.first_name}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="last_name" className="active custom-label">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className={errors.last_name ? "invalid" : ""}
              {...getFieldProps("last_name")}
            />
            {errors.last_name && (
              <span className="custom-helper-error">{errors.last_name}</span>
            )}
          </div>
        </div>
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
          <div className="input-field col m4 offset-m4">
            <label htmlFor="confirm_password" className="active custom-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              className={errors.confirm_password ? "invalid" : ""}
              {...getFieldProps("confirm_password")}
            />
            {errors.confirm_password && (
              <span className="custom-helper-error">
                {errors.confirm_password}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col m4 offset-m4">
            <button type="submit" className="btn right">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="row registration-row">
        <div className="col m12">
          <div className="center-align">
            Already registered?
            <Link to={"/login"} className="register-today">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;