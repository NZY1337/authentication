import { useEffect, useMemo, useState } from 'react';
import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import {
  AppProvider,
  type Session,
  type Navigation,
} from '@toolpad/core/AppProvider';


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
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© Andrei Mocanu' : `© ${new Date().getFullYear()} All rights reserved`}
      </Typography>
    );
  }

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

function CustomAppTitle() {
    const navigate = useNavigate();

    const handleClick = () => navigate('/');

    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <CloudCircleIcon fontSize="large" color="primary" onClick={handleClick} />
        <Typography variant="h6">My App</Typography>
        <Chip size="small" label="BETA" color="info" />
        <Tooltip title="Connected to production">
          <CheckCircleIcon color="success" fontSize="small" />
        </Tooltip>
      </Stack>
    );
  }

export default function DashboardLayoutAccount() {
  const { user, logoutUser } = useAppContext();
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        setSession({
            user: {
                name: user.name,
                email: user.email,
                image: 'https://avatars.githubusercontent.com/u', 
            }
        })
    } else {
        setSession(null)
    }
  },[user])

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        navigate('/user/login');
      },

      signOut: () => {
        setSession(null);
        logoutUser()
      },
    };
  }, [logoutUser, navigate]);

  const router = useDemoRouter('/dashboard');
  
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
      // logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
      title: 'Auth Dashboard',
      }}
    >
      <DashboardLayout 
            slots={{
                sidebarFooter: SidebarFooter,
                appTitle: CustomAppTitle,
            }}>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
