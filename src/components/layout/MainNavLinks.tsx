import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { authReq } from "../../API/api";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../modules/user/store/redux/authData";

const MainNavLinks = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogoutReq = () => {
    authReq({ route: "/auth/logout", values: {} }).then(() => {
      dispatch(handleLogout());
      navigate("/");
    }).catch(() => {
      dispatch(handleLogout());
      navigate("/");
    })
  }
  return (
    <>
      <Link
        to="/orders"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Orders
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => handleLogoutReq()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MainNavLinks;