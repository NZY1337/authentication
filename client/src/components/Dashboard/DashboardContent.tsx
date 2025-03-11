import { useState } from 'react';

import Typography from '@mui/material/Typography';
import ProfileDashboard from './components/User/DashboardProfile';
import BuilderOverview from './components/Builder/BuilderOverview';
import { type Router } from '@toolpad/core';
import { solutions } from '../../helpers/constants';
import AIBuilder from '../Builder/AIBuilder';

interface DashboardContentProps {
    router: Router;
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  }

function DashboardContent({ router, preview, setPreview }: DashboardContentProps) {
    const [selectedSolution, setSelectedSolution] = useState(solutions[0].label);

    const renderContent = () => {
      switch (router.pathname) {
        case '/profile':
          return <ProfileDashboard  />;

        case '/profile/lord-of-the-rings':
          return <Typography>Lord of the Rings</Typography>;
        
        case '/builder/virtual-staging':
          return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/redesigned-furnished-rooms':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/empty-your-space':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/landscaping':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder/render-exterior-structures':
            return <AIBuilder preview={preview} setPreview={setPreview} />;

        case '/builder':
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