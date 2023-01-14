import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Private_Route({ children }) {
  const is_authenticated = useSelector((state) => state.auth.is_authenticated);

  return is_authenticated ? children : <Navigate to="/login" />;
}

export default Private_Route;
