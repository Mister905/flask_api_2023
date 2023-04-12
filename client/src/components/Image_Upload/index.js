import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image_Upload_Preview from "../Image_Upload_Preview";
import { upload_image } from "../../actions/upload";

function Image_Upload() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    errors,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: Yup.object().shape({
      images: Yup.array().min(1, "You must upload at least 1 image file ( .jpg or .png )")
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      dispatch(upload_image(values));
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 center-align">
          <h1>Image Upload</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="row">
          <div className="input-field col m12 center-align">
            <Image_Upload_Preview
              setFieldValue={setFieldValue}
              images={values.images}
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col m12 center-align">
            {errors.images && (
              <span className="custom-helper-error">{errors.images}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col m4 offset-m4">
            <button type="submit" className="btn right">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Image_Upload;
