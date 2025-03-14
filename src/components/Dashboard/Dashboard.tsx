import { useMemo, useState, useEffect } from 'react';
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
import fetchData from '../../utils/fetchData';
import { solutions, EMPTY_YOUR_SPACE } from '../../helpers/constants';
import ProfileDashboard from './components/User/DashboardProfile';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';

// hooks
import { useAppContext } from '../../context/AppContext';
import { NotificationsProvider, useNotifications } from '@toolpad/core/useNotifications';

// types
import { type Router } from '@toolpad/core';


//* space types
interface Space {
    space_type: string;
}

interface SpaceTypeData {
    interior_spaces: Space[];
    exterior_spaces: Space[];
}

export interface SpaceTypeInterface {
    status: string;
    data: SpaceTypeData;
}

//* design themes
interface Design {
   design_theme: string; 
}

interface DesignTypeData {
    interior_themes: Design[],
    exterior_themes: Design[]
}

interface DesignThemeInterface {
    status: string;
    data: DesignTypeData;
}

//* Preview Props
interface PreviewProps {
    spaceTypeOptions?: {
        interior: { spaceTypeKeys: string[] | undefined; spaceTypeValues: string[] | undefined },
        exterior: { spaceTypeKeys: string[] | undefined; spaceTypeValues: string[] | undefined }
    } 
    designThemeOptions? : {
        interior: { designThemeKeys: string[] | undefined; designThemeValues: string[] | undefined },
        exterior: { designThemeKeys: string[] | undefined; designThemeValues: string[] | undefined }  
    },
}

export interface AIBuilderProps extends PreviewProps {
    isHomepage?: boolean
}

export type EmptySpaceProps = PreviewProps
export type VirtualStagingProps = PreviewProps

export type MaskState = {
    mask_url: string;
    mask_category: string;
    mask?: {
      status: string;
      data: {
        job_id: string;
        credits_consumed: number;
      };
    };
};
 
export default function Dashboard() {
    const { user, logoutUser } = useAppContext();
    const [spaceType, setSpaceType] = useState<SpaceTypeInterface | null>(null);
    const [designThemes, setDesignThemes] = useState<DesignThemeInterface| null>(null);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const notifications = useNotifications();
    const [mask, setMask] = useState<MaskState>({
        mask_url: "",
        mask_category: "",
        mask: {
          status: "",
          data: {
            job_id: "",
            credits_consumed: 0,
          },
        },
    });

    const [maskCategory, setMaskCategory] = useState(() => {
        const sol = solutions.find(solution => solution.selected);
        return sol ? sol.label : EMPTY_YOUR_SPACE.label;
    });

    const spaceTypeOptions = {
        interior: {
            spaceTypeKeys  : spaceType?.data.interior_spaces.map(item => Object.keys(item)[0]),
            spaceTypeValues: spaceType?.data.interior_spaces.map(item => Object.values(item)[0])
        },
        exterior: {
            spaceTypeKeys  : spaceType?.data.exterior_spaces.map(item => Object.keys(item)[0]),
            spaceTypeValues: spaceType?.data.exterior_spaces.map(item => Object.values(item)[0])
        }
    }

    const designThemeOptions = {
        interior: {
            designThemeKeys  : designThemes?.data.interior_themes.map(item => Object.keys(item)[0]),
            designThemeValues: designThemes?.data.interior_themes.map(item => Object.values(item)[0])
        },
        exterior: {
            designThemeKeys  : designThemes?.data.exterior_themes.map(item => Object.keys(item)[0]),
            designThemeValues: designThemes?.data.exterior_themes.map(item => Object.values(item)[0])
        }
    }

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
    

    useEffect(() => {
        const fetchDataParallel = async () => {
            try {
                const [
                    { resData: spaceData, error: spaceError }, 
                    { resData: themeData, error: themeError },
                ] = await Promise.all([
                        fetchData<null, { spaceType: SpaceTypeInterface }>({ url: '/builder/get-space-type', method: 'GET' }),
                        fetchData<null, { designThemes: DesignThemeInterface }>({ url: '/builder/get-design-theme', method: 'GET' })
                    ]);
    
                if (spaceError) {
                    console.error(spaceError)
                    notifications.show(spaceError, {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                };
                if (themeError) {
                    console.error(themeError);
                    notifications.show(spaceError, {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                };
    
                if (spaceData) setSpaceType(spaceData.spaceType);
                if (themeData) setDesignThemes(themeData.designThemes);
            } catch (err) {
                console.error("Error fetching data:", err);
                notifications.show('Data could not be fetched', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            }
        };
    
        fetchDataParallel();
    }, []);

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
                        mask={mask}
                        setFile={setFile} 
                        setMask={setMask}
                    />;
    
            case '/dashboard/empty-your-space':
                return <EmptySpace spaceTypeOptions={spaceTypeOptions} designThemeOptions={designThemeOptions} />
    
            case '/dashboard/virtual-staging':
                return <VirtualStaging spaceTypeOptions={spaceTypeOptions} designThemeOptions={designThemeOptions} />;
    
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
