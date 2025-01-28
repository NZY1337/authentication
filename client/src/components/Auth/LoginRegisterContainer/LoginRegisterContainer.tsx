import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Navigation from '../../Navigation';
import MuiCard from '@mui/material/Card';
import { Divider, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { styled } from '@mui/material/styles';
import Content from '../LoginRegisterContent/Content';
import { GoogleIcon } from '../CustomIcons/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  '& a': {
    color: theme.palette.grey[400],

    'span': {
        textDecoration: 'underline',
        color: theme.palette.warning.main
    }
  }
}));

export default function LoginRegisterContainer({ children }: { children: React.ReactNode }) {
    const { user } = useAppContext();
    const navigate = useNavigate();
    
    useEffect(() => {   
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

  return (
    <>
      <Navigation />
      <Stack 
        direction="column" 
        component="main"
        sx={{
            justifyContent: 'center', 
            minHeight: '100vh' ,
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), #1B1F1C)',
            backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ 
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <Card variant="outlined">
                {children}

                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
                    Sign in with Google
                </Button>
            </Box>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
