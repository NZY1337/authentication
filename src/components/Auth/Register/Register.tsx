import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { GoogleIcon } from '../CustomIcons/CustomIcons';
import { useAppContext } from '../../../context/AppContext';
import { CircularProgress } from '@mui/material';
import useValidateInputs from '../../../utils/validateInput';
import { Link as RouterLink } from 'react-router-dom';
import LoginRegisterContainer from '../LoginRegisterContainer/LoginRegisterContainer';

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { error, loading, setError, registerUser } = useAppContext()

  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const errors = { name: '', email: '', password: '', repeatPassword: ''};
  const { validateInputs, formErrors, } = useValidateInputs({ errors, formValues });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (validateInputs()) {
      const data = new FormData(formRef.current!);
      registerUser({name: data.get('name') as string, email: data.get('email') as string, password: data.get('password') as string })
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
    <LoginRegisterContainer>
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Register
        </Typography>
        <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

                <FormControl>
                    <FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
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
                
                {loading && <CircularProgress size={20} color="primary" />}
                            
                {error && <Typography component='p' fontSize={"small"} sx={{color: 'error.main'}}>{error}</Typography>}

            </Box>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
                Register
            </Button>
            <RouterLink to="/user/login" onClick={() => setError('')} style={{ textAlign: 'center', textDecoration: 'none' }} >
                Have an account?{' '}
                <Typography component={'span'}>Log in</Typography>
            </RouterLink>
        </Box>
        
    </LoginRegisterContainer>
  );
}
