import { Typography, Container } from '@mui/material';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid2 as Grid  } from "@mui/material";
import FormBuilder from './FormBuilder';


const Builder = () => {
  return (
    <Container maxWidth={false} 
        sx={{
        // height: '100vh',
        p: '8rem 0rem',
        backgroundColor: '#1E1E1E',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textAlign: 'center',
    }}>
        <Container>
            <Grid container justifyContent={"center"} spacing={3}>
                <Grid size={{ xs: 12, md: 6, lg: 12 }}>
                    <Typography variant="h1" textAlign={"center"} sx={{ mb: 3, borderRadius: '8px', fontWeight: 'bold' }}>
                        Create Now
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Typography variant="body1" textAlign={"left"}>
                        Create your dream interior space with AI-driven designs in any style: minimalistic, modern, baroque & more — tailored to your vision.
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Typography variant="body1" textAlign={"right"}>
                        Transform your space with AI-driven designs in any style: minimalistic, modern, baroque, & more — tailored to your vision.
                    </Typography>
                </Grid>
            </Grid>

        </Container>

        <Container maxWidth={"xl"}>
            <FormBuilder />
        </Container>
    </Container>
  );
};

export default Builder;

