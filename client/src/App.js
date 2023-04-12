import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Landing from "./components/Landing";
import Home from "./components/Home";
import Not_Found from "./components/Not_Found";
import Register from "./components/Register";
import Login from "./components/Login";
import Public_Route from "./components/Routing/Public_Route";
import Private_Route from "./components/Routing/Private_Route";
import Activate from "./components/Activate";
import Image_Upload from "./components/Image_Upload";
import Image_Gallery from "./components/Image_Gallery";

// Actions
import { load_active_user } from "./actions/auth";

function App() {
  const dispatch = useDispatch();

  const is_authenticated = useSelector((state) => state.auth.is_authenticated);

  useEffect(() => {
    dispatch(load_active_user());
  }, [is_authenticated]);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Not_Found />} />

        <Route
          path="/"
          element={
            <Public_Route>
              <Landing />
            </Public_Route>
          }
        />

        <Route
          path="/activate/:user_id"
          element={
            <Public_Route>
              <Activate />
            </Public_Route>
          }
        />

        <Route
          path="/login"
          element={
            <Public_Route>
              <Login />
            </Public_Route>
          }
        />

        <Route
          path="/register"
          element={
            <Public_Route>
              <Register />
            </Public_Route>
          }
        />

        <Route
          path="/home"
          element={
            <Private_Route>
              <Home />
            </Private_Route>
          }
        />

        <Route
          path="/image-upload"
          element={
            <Private_Route>
              <Image_Upload />
            </Private_Route>
          }
        />

        <Route
          path="/image-gallery"
          element={
            <Private_Route>
              <Image_Gallery />
            </Private_Route>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
