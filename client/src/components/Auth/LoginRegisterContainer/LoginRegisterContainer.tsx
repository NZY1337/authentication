import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Navigation from '../../Navigation';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import Content from '../LoginRegisterContent/Content';
import CardModel from '../../UtilityComponents/Card';

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
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <CardModel variant="outlined">
                {children}
            </CardModel>
          </Stack>
      </Stack>
    </>
  );
}
