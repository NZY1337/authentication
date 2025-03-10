import { useMemo } from 'react';
import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider, type Session, } from '@toolpad/core/AppProvider';
import DashboardContent from './DashboardContent';
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { PageContainer } from '@toolpad/core/PageContainer';

// https://mui.com/toolpad/core/react-dashboard-layout/?srsltid=AfmBOor80vsN0FvRmE_pISB6sVHhcnei4hFfLYkYDZxyqLlXsgsDKE7c :: DOCUMENTATION
// https://mui.com/store/previews/devias-kit/ :: example

export default function Dashboard() {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const router = useDemoRouter('/builder');

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
        theme={dashboardTheme}
        branding={{
            title: 'Auth Dashboard',
        }}>
        <DashboardLayout slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}>
            <PageContainer pathname={router.pathname} maxWidth={false} >
                <DashboardContent pathname={router.pathname} router={router} />
            </PageContainer>
        </DashboardLayout>
    </AppProvider>
  );
}
