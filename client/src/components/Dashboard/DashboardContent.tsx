import Typography from '@mui/material/Typography';
import ProfileDashboard from './components/User/DashboardProfile';
import AIBuilder from '../Builder/AIBuilder';
import { Link } from '@toolpad/core/internal';
import { type Router } from '@toolpad/core/AppProvider';

function DashboardContent({ pathname, router }: { pathname: string, router: Router }) {
    const renderContent = () => {
      switch (pathname) {
        case '/profile':
          return <ProfileDashboard />;
        case '/profile/lord-of-the-rings':
          return <Typography>Lord of the Rings</Typography>;
        case '/builder':
          return <AIBuilder  />;
        case '/builder/preview':
          return <Typography>Preview</Typography>;
        default:
          return null;
      }
    }
    
    return (
      <>
        {renderContent()}
        {/* <button onClick={() => router.navigate('/profile')}>Navigate</button> */}
        {/* <Link href='/profile'>go</Link> */}
      </>
    );
  }

  export default DashboardContent