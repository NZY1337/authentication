import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';
import { DescriptionOutlined } from '@mui/icons-material';

const DASHBOARD_NAVIGATION: Navigation = [
    {
        segment: 'builder',
        title: 'Builder',
        icon: <DashboardIcon />,
        children: [
            {
                segment: '',  // 👈 Add an empty segment to allow navigating back to /builder
                title: 'Overview',
                icon: <DashboardIcon />,
            },
            {
              segment: 'virtual-staging',
              title: 'Virtual Staging',
              icon: <DescriptionOutlined />,
            },
            {
                segment: 'redesigned-furnished-rooms',
                title: 'Redesigned Furnished Rooms',
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'empty-your-space',
                title: 'Empty Your Space',
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'landscaping',
                title: 'Landscaping',
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'render-exterior-structures',
                title: 'Render Exterior Structures',
                icon: <DescriptionOutlined />,
            },
          ],
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

const builderHouseAngle = ["side of house", "front of house", "back of house"];
const builderModeOptions = ["Beautiful Redesign", "Minimalist", "Luxury"];
const builderModeStyle = ["Modern", "Traditional", "Contemporary"];
const builderNumberOfDesigns = [1, 2, 3, 4];
const builderAiIntervention = [1, 2, 3, 4];

export {  DASHBOARD_NAVIGATION, builderAiIntervention, builderModeOptions, builderHouseAngle, builderModeStyle, builderNumberOfDesigns };