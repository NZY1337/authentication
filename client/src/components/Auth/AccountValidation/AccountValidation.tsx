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
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        p={3}
        sx={{
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }}
    >
        {loading ? (
            <CircularProgress />
        ) : (
        <>
            <Typography variant="h4" color="text.primary">
            {   error || message}
            </Typography>
            <Button component={RouterLink} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
                Return to Homepage
            </Button>
        </>
        )}
    </Stack>
    );
};

export default AccountValidation;
