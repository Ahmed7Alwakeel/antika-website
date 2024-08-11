import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedAuth = () => {
 
  if (Cookies.get("token")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
};

export default ProtectedAuth;
