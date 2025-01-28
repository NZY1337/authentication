import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import useQueryParams from '../../../helpers/hooks/useLocation';
import { useValidateAccount } from '../../../services/authentication/useValidateAccount';
import CircularProgress from '@mui/material/CircularProgress';

const AccountValidation = () => {
  const { getParam } = useQueryParams();
  const email = getParam('email');
  const verificationToken = getParam('token');
  const { message, error, loading } = useValidateAccount({ email, verificationToken });
  
  return (
    <>
      <Stack direction="column" component="main"
        sx={[
          {
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
          },
        ]}
      >
        <Stack direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack direction={{ xs: 'column-reverse', lg: 'column' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 2 },
              m: 'auto',
              textAlign: 'center'
            }}
          >
            {loading && 
                <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Stack> 
            }

            {error && 
              <Typography variant="h4" sx={{ color: 'text.primary' }}>
                {error}
              </Typography>
            }
           
            {message && 
                <Typography variant="h4" sx={{ color: 'text.primary' }}>
                  {message}
                </Typography>
            }

            <Button component={RouterLink} to="/" variant="contained" color="primary"> 
                Return to Homepage
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AccountValidation;
