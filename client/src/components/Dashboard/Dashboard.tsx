import { useMemo, useState, useEffect } from 'react';
import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider, type Session, } from '@toolpad/core/AppProvider';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import DashboardContent from './DashboardContent';
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { PageContainer } from '@toolpad/core/PageContainer';


export default function Dashboard() {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const router = useDemoRouter('/builder');
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    const route = localStorage.getItem('route');
    if (route) router.navigate(route)
  },[])

  useEffect(() => {
    localStorage.setItem('route', router.pathname);

    return () => {
        localStorage.setItem('route', '/builder');
    }
  },[router.pathname])
  
  return (
    <AppProvider
        session={{ 
            user: { 
                name: user?.name,
                image: user?.avatar || 'https://avatars.githubusercontent.com/c',
                email: user?.email,
                id: user?.id
            } as Session['user'],
        }}
        authentication={authentication}
        navigation={DASHBOARD_NAVIGATION}
        router={router}
        theme={dashboardTheme}>
        <NotificationsProvider 
            slotProps={{
                snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            }}}>
                <DashboardLayout 
                    sx={{ '.css-1xraqll-MuiList-root li:not(:first-of-type)': preview ? {display: 'none'} : { color: 'gray', pointerEvents: 'none', display: 'none'}}}
                    slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}>
                        <PageContainer pathname={router.pathname}>
                            <DashboardContent router={router} preview={preview} setPreview={setPreview}/>
                        </PageContainer>
                </DashboardLayout>
        </NotificationsProvider>
    </AppProvider>
  );
}
