import { Box, Typography, Container, Button } from '@mui/material';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Navigation from '../Navigation';
import hero from '../../assets/hero-bg.jpg';

// https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

const Hero = () => {
  return (
    <Container maxWidth={false} 
        sx={{
        height: '100vh',
        width: '100%',
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1512972972907-6d71529c5e92?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${hero})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: 'flex-start',
        color: '#fff',
        textAlign: 'center',
        p: 3,
    }}>
        <Navigation />
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
            }}>
                <Typography 
                    variant="h1" 
                    component="h1"
                    sx={{
                        mb: 3,
                        borderRadius: '8px',
                        fontWeight: 'bold',
                    }}>
                    Designing a Home. <br /> Creating a Living.
                </Typography>

                <Typography variant="subtitle1" component="body" width={"50%"}>
                    We are generic frontenders who do generic things for generic people who do generic things.
                </Typography>

                <Box 
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: 2
                    }}>
                        <Button variant='contained'>Get Started Now</Button>
                        <Button sx={{color: 'orange'}} variant='text'>Request a Demo <ArrowRight /></Button>
                </Box>
            </Box>
            
        </Container>
    </Container>
  );
};

export default Hero;

