import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import BuilderOverview from './components/Builder/BuilderOverview';
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import EmptySpace from './components/Builder/EmptySpace';
import VirtualStaging from './components/Builder/VirtualStaging';


// utils
import { solutions, EMPTY_YOUR_SPACE } from '../../helpers/constants';
import ProfileDashboard from './components/User/DashboardProfile';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';

// hooks
import { useAppContext } from '../../context/AppContext';
import { NotificationsProvider } from '@toolpad/core/useNotifications';

// types
import { type Router } from '@toolpad/core';


export default function Dashboard() {
    const [file, setFile] = useState<File | null>(null);

    // hooks
    const { user, logoutUser } = useAppContext();
    const navigate = useNavigate();

    const [maskCategory, setMaskCategory] = useState(() => {
        const sol = solutions.find(solution => solution.selected);
        return sol ? sol.label : EMPTY_YOUR_SPACE.label;
    });

    const router: Router = useMemo(() => ({
        navigate: (path: string | URL) => {
            const newPath = path.toString();
            if (window.location.pathname !== newPath) { // ✅ Prevents re-navigation if already on the same page
                navigate(newPath);
            }
        },
        pathname: window.location.pathname,
        searchParams: new URLSearchParams(window.location.search),
    }), [navigate]);
    
    const authentication = useMemo(() => ({
        signIn: () => navigate('/user/login'), signOut: () => logoutUser() 
    }),[logoutUser, navigate]);

    const renderContent = () => {
        switch (router.pathname) {
            case '/dashboard/profile':
                return <ProfileDashboard />;

            case '/dashboard/overview':
                return <BuilderOverview 
                        setMaskCategory={setMaskCategory} 
                        maskCategory={maskCategory} 
                        router={router}
                        file={file}
                        setFile={setFile} 
                    />;
            
            case '/dashboard/empty-your-space':
                return <EmptySpace router={router} />
    
            case '/dashboard/virtual-staging':
                return <VirtualStaging router={router} />;
    
            default:
                return null;
        }
    };

    return (
        <AppProvider
            session={{user: { name: user?.name, image: user?.avatar || 'https://avatars.githubusercontent.com/c', email: user?.email, id: user?.id } as Session['user']}}
            authentication={authentication}
            navigation={DASHBOARD_NAVIGATION}
            router={router}
            theme={dashboardTheme}>
            <NotificationsProvider slotProps={{ snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }}}}>
                <DashboardLayout 
                    slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}
                    // sx={{'.css-1xraqll-MuiList-root li:not(:first-of-type)': preview ? { display: 'none' } : { color: 'gray', pointerEvents: 'none', display: 'none' }}}
                    >
                    <PageContainer pathname={router.pathname}>
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider>
    );
}
