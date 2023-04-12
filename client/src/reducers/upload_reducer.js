import { IMAGES_LOADED } from "../actions/types";

const initial_state = {
  loading_images: true,
  images: [],
};

export default function (state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case IMAGES_LOADED:
      return {
        ...state,
        loading_images: false,
        images: payload.files,
      };
    default:
      return state;
  }
}
