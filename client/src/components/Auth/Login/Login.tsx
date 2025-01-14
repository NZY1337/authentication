import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import LoginCard from './LoginCard';
import Content from './Content';
import Navigation from '../../Navigation';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';

export default function Login() {
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
      <Stack direction="column" component="main"
        sx={[
          {
            justifyContent: 'center',
            minHeight: '100vh',
          },
          (theme) => ({
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), #1B1F1C)',
              }),
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <LoginCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
