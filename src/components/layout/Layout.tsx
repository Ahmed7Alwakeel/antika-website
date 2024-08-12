import { Slide, toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { handleLogout, setUserData, setUserToken } from "../../modules/user/store/redux/authData";
import { generalGet } from "../../API/api";
import GlobalLoader from "./GlobalLoader";


type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (Cookies.get("token")) {
      generalGet('/user/profile').then(res => {
        if (res.data.data.user.role == "admin") {
          toast.error("inactive user")
          dispatch(handleLogout())
          navigate('/')
        }
        const data = res.data.data.user
        dispatch(setUserData(data))
        Cookies.set("user_data", JSON.stringify(data))
        dispatch(setUserToken(Cookies.get("token") as string))
        setLoading(false)
      }).catch(() => {
        dispatch(handleLogout())
        setLoading(false)
        navigate('/')
      })
    } else {
      setLoading(false)
    }
  }, [])

  const { pathname } = useLocation()

  if (loading) return <div className="spinner">
    <div className="loader"></div>
  </div>

  return (
    <>
      <GlobalLoader />
      <div className="flex flex-col min-h-screen">
        <ToastContainer
          autoClose={2000}
          draggable={false}
          hideProgressBar={true}
          position='top-right'
          transition={Slide}
        />
        <Header />
        {pathname == "/" && <Hero />}
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;