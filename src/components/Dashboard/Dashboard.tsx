import { useEffect, useMemo } from 'react';
import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {
  AppProvider,
  type Session,
  type Navigation,
} from '@toolpad/core/AppProvider';

// https://mui.com/toolpad/core/react-dashboard-layout/?srsltid=AfmBOor80vsN0FvRmE_pISB6sVHhcnei4hFfLYkYDZxyqLlXsgsDKE7c :: DOCUMENTATION
// https://mui.com/store/previews/devias-kit/ :: example

import DashboardContent from './DashboardContent';
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';

const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
      },
      {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
      },
      {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
      },
      {
        segment: 'profile',
        title: 'Profile',
        icon: <UserIcon />,
    },
];

export default function DashboardLayoutAccount() {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        navigate('/user/login');
      },
      signOut: () => {
        logoutUser();
      },
    };
  }, [logoutUser, navigate]);

  const router = useDemoRouter('/dashboard');
  
  return (
    <AppProvider
        session={{ 
            user: { 
                name: user?.name,
                image: user?.avatar || 'https://avatars.githubusercontent.com/c',
                email: user?.email
            }
        }}
        authentication={authentication}
        navigation={NAVIGATION}
        router={router}
        theme={dashboardTheme}
        branding={{
            title: 'Auth Dashboard',
        }}>
        <DashboardLayout  slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}>
            <DashboardContent pathname={router.pathname} />
        </DashboardLayout>
    </AppProvider>
  );
}
