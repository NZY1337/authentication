import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';



function DashboardTitle() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" sx={{cursor: 'pointer', color: 'primary.main'}} onClick={handleClick}>Home</Typography>
      </Stack>
    );
}

export default DashboardTitle;