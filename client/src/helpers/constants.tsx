import { type Navigation } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/Person';
import { DescriptionOutlined } from '@mui/icons-material';

import goodPhoto1 from "../assets/guidelines/goodPhoto1.png"
import goodPhoto2 from "../assets/guidelines/goodPhoto2.png"
import goodPhoto3 from "../assets/guidelines/goodPhoto3.png"
import goodPhoto4 from "../assets/guidelines/goodPhoto4.png"
import badPhoto1 from "../assets/guidelines/badPhoto1.png"
import badPhoto2 from "../assets/guidelines/badPhoto2.png"
import badPhoto3 from "../assets/guidelines/badPhoto3.png"
import badPhoto4 from "../assets/guidelines/badPhoto4.png"

import SofaIcon from "@mui/icons-material/Weekend";
import ChairIcon from "@mui/icons-material/Chair";
import DeleteIcon from "@mui/icons-material/Delete";
import ParkIcon from "@mui/icons-material/Park";
import HomeIcon from "@mui/icons-material/Home";

const VIRTUAL_STAGING_LABEL = "Virtual Staging";
const REDESIGN_FURNISHED_ROOMS_LABEL = "Redesign Furnished Rooms";
const EMPTY_YOUR_SPACE_LABEL = "Empty Your Space";
const LANDSCAPING_LABEL = "Landscaping";
const RENDER_EXTERIOR_STRUCTURES_LABEL = "Render Exterior Structures";

const ROTATION = [90, 180, 270, 360];

const solutions = [
    { label: VIRTUAL_STAGING_LABEL, icon: <SofaIcon />, selected: true },
    { label: REDESIGN_FURNISHED_ROOMS_LABEL, icon: <ChairIcon /> },
    { label: EMPTY_YOUR_SPACE_LABEL, icon: <DeleteIcon /> },
    { label: LANDSCAPING_LABEL, icon: <ParkIcon /> },
    { label: RENDER_EXTERIOR_STRUCTURES_LABEL, icon: <HomeIcon /> },
];

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
                title: VIRTUAL_STAGING_LABEL,
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'redesigned-furnished-rooms',
                title: REDESIGN_FURNISHED_ROOMS_LABEL,
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'empty-your-space',
                title: EMPTY_YOUR_SPACE_LABEL,
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'landscaping',
                title: LANDSCAPING_LABEL,
                icon: <DescriptionOutlined />,
            },
            {
                segment: 'render-exterior-structures',
                title: RENDER_EXTERIOR_STRUCTURES_LABEL,
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

// Example data arrays
const badPhotosData = [
    {
      label: "People in the photo",
      src: badPhoto1
    },
    {
      label: "Close-up shots",
      src: badPhoto2
    },
    {
      label: "Tilted angles",
      src: badPhoto3
    },
    {
      label: "Floor plans",
      src: badPhoto4
    }
];
  
  const goodPhotosData = [
    {
      label: "Wide angle photo",
      src: goodPhoto1
    },
    {
      label: "Straightened photo",
      src: goodPhoto2
    },
    {
      label: "Good resolution",
      src: goodPhoto3
    },
    {
      label: "Better depth",
      src: goodPhoto4
    }
];

const builderHouseAngle = ["side of house", "front of house", "back of house"];
const builderModeOptions = ["Beautiful Redesign", "Minimalist", "Luxury"];
const builderModeStyle = ["Modern", "Traditional", "Contemporary"];
const builderNumberOfDesigns = [1, 2, 3, 4];
const builderAiIntervention = [1, 2, 3, 4];

export {  
    DASHBOARD_NAVIGATION, 
    ROTATION,
    builderAiIntervention, 
    builderModeOptions, 
    builderHouseAngle, 
    builderModeStyle, 
    builderNumberOfDesigns,
    goodPhotosData,
    badPhotosData,
    solutions
};