import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CardModel from '../../UtilityComponents.tsx/Card';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink} from 'react-router-dom';

import useValidateInputs from '../../../utils/validateInput';
import useQueryParams from '../../../helpers/hooks/useLocation';
import { useResetPassword } from '../../../services/authentication/useResetPassword';

export default function SignInCard() {
  const formRef = useRef<HTMLFormElement>(null);
  const { getParam } = useQueryParams();

  const email = getParam('email')!;
  const token = getParam('token')!;

  const [showPassword, setShowPassword] = useState({
      password: false,
      repeatPassword: false,  
  });

  const handleTogglePassword = (field: "password" | "repeatPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [formValues, setFormValues] = React.useState({
    password: '',
    repeatPassword: ''
  });

  const errors = {
    password: '',
    repeatPassword: ''
  }

  const { validateInputs, formErrors } = useValidateInputs({ errors, formValues }); // formValues needs to be an object

  const { message, error, loading, resetPassword } = useResetPassword();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      await resetPassword({ email, token, password: formValues.password }); 
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <CardModel variant="outlined">
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Reset Password
      </Typography>
      <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
                <FormLabel htmlFor="password">New Password</FormLabel>
                <TextField
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type={`${showPassword.password ? 'text' : 'password'}`}
                    id="password"
                    variant="outlined"
                    value={formValues.password}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                    slotProps={{
                        input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePassword('password')} edge="end">
                                  {showPassword.password ? <VisibilityOff fontSize='small'  /> : <Visibility fontSize='small'  />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                    }}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="repeatPassword">Repeat New Password</FormLabel>
                    <TextField
                        fullWidth
                        name="repeatPassword"
                        placeholder="••••••"
                        type={`${showPassword.repeatPassword ? 'text' : 'password'}`}
                        id="repeatPassword"
                        variant="outlined"
                        value={formValues.repeatPassword}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.repeatPassword)}
                        helperText={formErrors.repeatPassword}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton onClick={() => handleTogglePassword('repeatPassword')} edge="end" >
                                        {showPassword.password ? <VisibilityOff fontSize='small'  /> : <Visibility fontSize='small'  />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                },
                        }}
                    />
            </FormControl>
            
            {message && 
                <RouterLink to="/" color="primary"> 
                    {message}
                </RouterLink>
            }
            
            {loading && <CircularProgress size={20} color="primary" />}
            {error && <Typography component='p' color="secondary">{error}</Typography>}
        </Box>
        <Button type="submit" fullWidth variant="contained">
          Reset Password 
        </Button>
      </Box>
    </CardModel>
  );
}
