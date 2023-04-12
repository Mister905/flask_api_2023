import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_images } from "../../actions/upload";
import Preloader from "../Preloader";

function Image_Gallery() {
  const dispatch = useDispatch();

  const { loading_images } = useSelector((state) => state.upload);

  const { images } = useSelector((state) => state.upload);

  useEffect(() => {
    dispatch(get_images());
  }, [loading_images]);

  function output_images() {
    if (images.length === 0) {
      return <div>You haven't uploaded any images yet.</div>;
    } else {
      return (
        <div>
          {images.map((image) => {
            return (
              <div>
                <img src={image}></img>
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="mt-50">
      {loading_images ? (
        <div className="row">
          <div className="col m10 offset-m1 center-align">
            <Preloader />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col m8">{output_images()}</div>
        </div>
      )}
    </div>
  );
}

export default Image_Gallery;
