import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProtectedRoute = () => {
  const { user, userLoading } = useAppContext();
  const location = useLocation();

  if (userLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={200}/>
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to="/user/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
