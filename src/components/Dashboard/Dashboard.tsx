import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { PageContainer } from '@toolpad/core/PageContainer';
import DashboardContent from './DashboardContent';

export default function Dashboard() {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  // Custom router object for controlled navigation
  const router = {
    navigate: (path: string | URL) => navigate(path.toString()),
    pathname: window.location.pathname,
    searchParams: new URLSearchParams(window.location.search),
  };

  const authentication = useMemo(
    () => ({
      signIn: () => navigate('/user/login'),
      signOut: () => logoutUser(),
    }),
    [logoutUser, navigate]
  );

  return (
    <AppProvider
      session={{
        user: {
          name: user?.name,
          image: user?.avatar || 'https://avatars.githubusercontent.com/c',
          email: user?.email,
          id: user?.id,
        } as Session['user'],
      }}
      authentication={authentication}
      navigation={DASHBOARD_NAVIGATION}
      router={router}
      theme={dashboardTheme}
    >
      <NotificationsProvider
        slotProps={{
          snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } },
        }}
      >
        <DashboardLayout
          sx={{
            '.css-1xraqll-MuiList-root li:not(:first-of-type)': preview
              ? { display: 'none' }
              : { color: 'gray', pointerEvents: 'none', display: 'none' },
          }}
          slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}
        >
          <PageContainer pathname={router.pathname}>
            <DashboardContent preview={preview} setPreview={setPreview} router={router} />
          </PageContainer>
        </DashboardLayout>
      </NotificationsProvider>
    </AppProvider>
  );
}
