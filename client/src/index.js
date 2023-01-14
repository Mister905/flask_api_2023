import React from "react";
import { createRoot } from "react-dom/client";
import "materialize-css/dist/css/materialize.min.css";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
