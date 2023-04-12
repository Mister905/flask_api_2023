import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout_user } from "../../actions/auth";

function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { is_authenticated } = useSelector((state) => state.auth);

  function handle_logout() {
    dispatch(logout_user(navigate));
  }

  return (
    <div>
      <nav>
        <div className="container nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {is_authenticated ? (
              <React.Fragment>
                <li>
                  <Link to={"/home"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/image-upload"}>
                    Image Upload
                  </Link>
                </li>
                <li>
                  <Link to={"/image-gallery"}>
                    Image Gallery
                  </Link>
                </li>
                <li>
                  <a onClick={handle_logout}>
                    Logout
                  </a>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <h1 className="center-align">Home</h1>
    </div>
  );
}

export default Home;
