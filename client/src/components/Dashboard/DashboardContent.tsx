import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import ProfileDashboard from './components/User/DashboardProfile';
import DashboardBuilder from './components/Builder/DashboardBuilder';

function DashboardContent({ pathname }: { pathname: string }) {
    const renderTitle = () => {
        switch (pathname) {
          case '/profile':
            return 'Profile';
          case '/builder':
            return 'Builder';
          case '/orders':
            return 'Orders';
          case '/reports':
              return 'Reports';
          default:
            return null;
        }
    }

    const renderContent = () => {
      switch (pathname) {
        case '/profile':
          return <ProfileDashboard />;

          case '/builder':
            return <DashboardBuilder />;
        default:
          return null;
      }
    }
    
    return (
      <Container maxWidth={false} sx={{py: 4}}>
        <Typography variant="h5" marginBottom={4} gutterBottom>{renderTitle()}</Typography>
        {renderContent()}
      </Container>
    );
  }

  export default DashboardContent