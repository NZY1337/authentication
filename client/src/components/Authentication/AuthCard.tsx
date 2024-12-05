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
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import Link from '@mui/material/Link';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

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

export default function SignInCard() {
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [loginOrRegister, setLoginOrRegister] = React.useState(false);
  const { loginUser, error, registerUser } = useAppContext()
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [formErrors, setFormErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      const data = new FormData(formRef.current!);
      if (!loginOrRegister) {
        loginUser({ email: data.get('email') as string, password: data.get('password') as string }, navigate);
      } else {
        registerUser({name: data.get('name') as string, email: data.get('email') as string, password: data.get('password') as string }, navigate)
      }
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

  const validateInputs = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    };

    let isValid = true;

    if (formValues.name.trim() === '' && loginOrRegister) {
      errors.name = 'Name is required.';
      isValid = false;
    }

    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formValues.password || formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    if (formValues.password !== formValues.repeatPassword && loginOrRegister) {
        errors.repeatPassword = 'Passwords do not match.';
        isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        {loginOrRegister ? 'Sign up' : 'Sign in'}
      </Typography>
      <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loginOrRegister && (
                <FormControl>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <TextField
                    autoComplete="name"
                    name="name"
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    value={formValues.name}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.name)}
                    helperText={formErrors.name}
                    />
                </FormControl>
            )}

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
                placeholder="••••••"
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

            {loginOrRegister && (
                <FormControl>
                    <FormLabel htmlFor="password">Repeat Password</FormLabel>
                    <TextField
                    fullWidth
                    name="repeatPassword"
                    placeholder="••••••"
                    type="password"
                    id="repeatPassword"
                    autoComplete="repeat-password"
                    variant="outlined"
                    value={formValues.repeatPassword}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.repeatPassword)}
                    helperText={formErrors.repeatPassword}
                    />
                </FormControl>
            )}
                        
            {error && <Typography component='p' color="secondary">{error}</Typography>}

          </Box>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Sign {loginOrRegister ? ' up' : ' in'}
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link onClick={() => setLoginOrRegister(!loginOrRegister)} variant="body2" 
                sx={{ alignSelf: 'center', cursor: 'pointer' }}>
                Sign {!loginOrRegister ? 'up' : ' in'}
            </Link>
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
