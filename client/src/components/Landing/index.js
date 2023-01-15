import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <div className="container nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1 className="center-align">Landing</h1>
    </div>
  );
}

export default Landing;
