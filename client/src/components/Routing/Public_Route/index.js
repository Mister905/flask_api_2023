import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Public_Route({ children }) {
  const is_authenticated = useSelector((state) => state.auth.is_authenticated);

  return is_authenticated ? <Navigate to="/home" /> : children;
}

export default Public_Route;
