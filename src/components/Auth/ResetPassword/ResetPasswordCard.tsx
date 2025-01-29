import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import useQueryParams from '../../../helpers/hooks/useLocation';
import { useResetPassword } from '../../../services/authentication/useResetPassword';
import { Link as RouterLink} from 'react-router-dom';
import useValidateInputs from '../../../utils/validateInput';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { getParam } = useQueryParams();

  const email = getParam('email')!;
  const token = getParam('token')!;

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
                type="password"
                id="password"
                autoComplete="password"
                variant="outlined"
                value={formValues.password}
                onChange={handleInputChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
              />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="repeatPassword">Repeat New Password</FormLabel>
                <TextField
                    fullWidth
                    name="repeatPassword"
                    placeholder="••••••"
                    type="password"
                    id="repeatPassword"
                    autoComplete="repeat-new-password"
                    variant="outlined"
                    value={formValues.repeatPassword}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.repeatPassword)}
                    helperText={formErrors.repeatPassword}
                    />
                </FormControl>
            
            {message && <RouterLink to="/" color="primary"> 
              {message}
            </RouterLink>}
            {loading && <CircularProgress size={20} color="primary" />}
                        
            {error && <Typography component='p' color="secondary">{error}</Typography>}
        </Box>
        <Button type="submit" fullWidth variant="contained">
          Reset Password 
        </Button>
      </Box>
    </Card>
  );
}
