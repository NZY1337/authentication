import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';

const DASHBOARD_NAVIGATION: Navigation = [
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

export {  DASHBOARD_NAVIGATION };