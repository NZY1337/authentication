import { Box, Typography } from '@mui/material';
import Navigation from '../Navigation';

const Hero = () => {
  return (
    <>
        <Navigation />
        <Box
            sx={{
                height: '100vh',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#fff',
                textAlign: 'center',
                p: 3,
            }}>
            <Typography variant="h1" component="h1"
                sx={{
                    color: 'orange',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    // fontSize: '3rem'
                }}> Hi. <br /> We are generic frontenders
            </Typography>

            <Typography variant="body2" component="body">
                We are generic frontenders who do generic things for generic people
            </Typography>
        </Box>
    </>
  );
};

export default Hero;

