import { Box, Typography } from '@mui/material';
import Navigation from '../navigation';

const Hero = () => {
  return (
    <>
        <Navigation />
        <Box
        sx={{
            height: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            p: 3,
        }}
        >
        <Typography
            variant="h3"
            component="h1"
            sx={{
                color: 'orange',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: 'bold'
            }}
        >
            Hi
        </Typography>
        </Box>
    </>
  );
};

export default Hero;

