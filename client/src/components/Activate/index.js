import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { activate_user } from "../../actions/auth";
import { Link } from "react-router-dom";

function Activate() {
  let { user_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activate_user(user_id));
  }, []);
  return (
    <div>
      <h1>Activated!</h1>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default Activate;
