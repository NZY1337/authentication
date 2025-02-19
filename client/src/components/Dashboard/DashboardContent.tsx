import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import UserDashboard from './components/User/UserDashboard';

function DashboardContent({ pathname }: { pathname: string }) {
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
        <Typography variant="h5" marginBottom={4} gutterBottom>Profile</Typography>
        {renderContent()}
      </Container>
    );
  }

  export default DashboardContent