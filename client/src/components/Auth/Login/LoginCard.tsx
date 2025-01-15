import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { GoogleIcon } from '../CustomIcons/CustomIcons';
import Link from '@mui/material/Link';
import { useAppContext } from '../../../context/AppContext';
import { CircularProgress } from '@mui/material';
import useValidateInputs from '../../../utils/validateInput';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function LogInCard() {
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { loginUser, error, loading } = useAppContext()
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  const errors = { email: '', password: ''};
  const { validateInputs, formErrors} = useValidateInputs({ errors, formValues });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(validateInputs())

    if (validateInputs()) {
      const data = new FormData(formRef.current!);
      loginUser({ email: data.get('email') as string, password: data.get('password') as string }, navigate);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Log In
      </Typography>
      <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={formValues.email}
                onChange={handleInputChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </FormControl>

            <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                <Link component="button" type="button" onClick={handleClickOpen}  variant="body2" sx={{ alignSelf: 'baseline' }}>
                        Forgot your password?
                    </Link>
                </Box>
              
              <TextField
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={formValues.password}
                onChange={handleInputChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
              />
            </FormControl>

            {loading && <CircularProgress size={20} color="primary" />}
                        
            {error && <Typography component='p' color="secondary">{error}</Typography>}

          </Box>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Log In 
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <RouterLink to="/user/register">
                Register 
            </RouterLink>
          </span>
        </Typography>
        
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </Box>
    </Card>
  );
}
