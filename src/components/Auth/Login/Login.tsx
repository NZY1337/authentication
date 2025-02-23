import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { useAppContext } from '../../../context/AppContext';
import { CircularProgress } from '@mui/material';
import useValidateInputs from '../../../utils/validateInput';
import { useForgotPassword } from '../../../services/authentication/useForgotPassword';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginRegisterContainer from '../LoginRegisterContainer/LoginRegisterContainer';


const Login = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { loginUser, error, loading, setError } = useAppContext()
  const navigate = useNavigate();
  const { open, handleClickOpen, handleClose } = useForgotPassword();

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  const errors = { email: '', password: ''};
  const { validateInputs, formErrors} = useValidateInputs({ errors, formValues });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <LoginRegisterContainer>
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
                            <Typography onClick={handleClickOpen} sx={{ cursor: 'pointer', textDecoration:'underline', alignSelf: 'baseline', color: 'grey.400' }}>
                                Forgot your password?
                            </Typography>
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
                                
                    {error && <Typography component='p' fontSize={"small"} sx={{color: 'error.main'}}>{error}</Typography>}
                </Box>

                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                <ForgotPassword open={open} handleClose={handleClose} />

                <Button type="submit" fullWidth variant="contained">
                    Log In 
                </Button>
                
                <RouterLink onClick={() => setError('')} to="/user/register" style={{ textAlign: 'center', textDecoration: 'none' }} >
                    Don&apos;t have an account?{' '}
                    <Typography component={'span'}>Register</Typography>
                </RouterLink>
            </Box>
    </LoginRegisterContainer>
  );
}

export default Login;