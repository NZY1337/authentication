import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import UserDashboard from './components/User/UserDashboard';

function DashboardContent({ pathname }: { pathname: string }) {
    const renderTitle = () => {
        switch (pathname) {
          case '/profile':
            return 'Profile';
          case '/dashboard':
            return 'Dashboard';
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
          return <UserDashboard />;
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