import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from '../utils/ProtectedRoute';
import RestaurantDetails from './pages/RestaurantDetails';
import OrderStatus from './pages/OrderStatus';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedAuth from '../utils/ProtectedAuth';
import Branches from './pages/Branches';
import Orders from './pages/Orders';

const AppRoutes = () => {
    const NotFound = () => {
        return <div>Page Not Found</div>
    }
    return (
        <Routes>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/branches" element={<Branches />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/order-status/:id" element={<OrderStatus />} />
                <Route path="/orders" element={< Orders />} />
            </Route>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedAuth />}>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
        </Routes>
    );
}

export default AppRoutes;