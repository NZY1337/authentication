import { useState, useEffect, ChangeEvent } from 'react';
import FormControl  from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import GenericDialog from '../../Dialog/GenericDialog';

import { useForgotPassword } from '../../../services/authentication/useForgotPassword';
import useValidateInputs from '../../../utils/validateInput';


interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState<string>('');
  const [timer, setTimer] = useState<number>(2);
  const { forgotPassword, loading, message, setMessage } = useForgotPassword();
  const { validateInputs, formErrors, setFormErrors } = useValidateInputs({ errors: { email: '' }, formValues: { email } }); // formValues needs to be an object

  const onHandleForgotPassword = async () => {
    if (!validateInputs()) return;
    await forgotPassword(email);
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    let int: NodeJS.Timeout | null = null;
    
    if (message) {
        setTimer(2)
        int = setInterval(() => {
            setTimer((timer) => {
              if (timer === 0) {
                clearInterval(int!);
                setMessage('');
                return timer;
              }
              return timer - 1;
            });
        }, 1000);
    }
  
    return () => {
      setTimer(2)
      if (int) clearInterval(int);
      setEmail('');
      setFormErrors({email: ''});
    };
  }, [handleClose, message, open, setFormErrors, setMessage]);

 const dialogSubtitle = () => {
    if (message && timer) return `${message}`;
    return 'Enter your account\'s email address, and we\'ll send you a link to reset your password.'
 }

  return (
    <GenericDialog 
        open={open} 
        handleClose={handleClose}
        dialogTitle="Reset password"
        dialogActions="forgot-password"
        dialogSubtitle={dialogSubtitle()}
        loading={loading}
        onSubmit={onHandleForgotPassword}>
            <FormControl>
                <TextField
                    fullWidth
                    name="forgot-email"
                    type="string"
                    id="forgot-email"
                    variant="outlined"
                    placeholder='Enter your email'
                    value={email}
                    onChange={handleInputChange}        
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                />
            </FormControl>
    </GenericDialog>
  );
}
