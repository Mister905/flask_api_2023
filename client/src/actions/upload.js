import instance from "../utils/axios";
import { IMAGES_LOADED } from "./types";

export const upload_image =
  ({ images }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await instance.post("/image", images, config);

      if (res.data.error) {
        console.log(res.data.error);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const get_images = () => async (dispatch) => {
  try {
    const res = await instance.get("/image/all");
    
    dispatch({
      type: IMAGES_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
