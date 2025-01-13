import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProtectedRoute = () => {
    const { user } = useAppContext();
    const location = useLocation();

    return user ? <Outlet /> : <Navigate to="/user/login" replace state={{ from: location }} />;
}; 

export default ProtectedRoute;