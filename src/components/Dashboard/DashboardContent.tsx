import { useState, useEffect } from 'react';
import ProfileDashboard from './components/User/DashboardProfile';
import BuilderOverview from './components/Builder/BuilderOverview';
import { type Router } from '@toolpad/core';
import { solutions, EMPTY_YOUR_SPACE_LABEL } from '../../helpers/constants';
import AIBuilder from '../Builder/AIBuilder';
import fetchData from '../../utils/fetchData';

interface DashboardContentProps {
    router: Router;
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

function DashboardContent({ router, preview, setPreview }: DashboardContentProps) {
    const [selectedSolution, setSelectedSolution] = useState(() => {
        const sol = solutions.find(solution => solution.selected);
        return sol ? sol.label : EMPTY_YOUR_SPACE_LABEL;
    });

    const [spaceType, setSpaceType] = useState<object | null>(null);

    useEffect(() => {
        const getSpaceType = async () => {
            const { resData, error } = await fetchData<null, { spaceType: object }>({
                url: '/builder/get-space-type',
                method: 'GET',
            });
    
            if (error) {
                return console.error(error);
            }
    
            if (resData) {
                setSpaceType(resData.spaceType);
                // console.log(resData)
            }
        }

        getSpaceType();
    },[])

    const renderContent = () => {
      switch (router.pathname) {
        case '/dashboard/profile':
          return <ProfileDashboard />;

        case '/dashboard/empty-your-space':
            return <AIBuilder preview={preview} setPreview={setPreview} spaceType={spaceType} />;

        case '/builder/virtual-staging':
          return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/redesigned-furnished-rooms':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/dashboard/landscaping':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/render-exterior-structures':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/dashboard':
            return <BuilderOverview 
                    setSelectedSolution={setSelectedSolution} 
                    selectedSolution={selectedSolution} 
                    preview={preview} 
                    setPreview={setPreview} 
                    router={router} 
                />;

        default:
          return null;
      }
    }

    return renderContent()
  }

  export default DashboardContent