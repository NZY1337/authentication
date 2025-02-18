import { useState, useEffect, ChangeEvent } from 'react';
import FormControl  from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useForgotPassword } from '../../../services/authentication/useForgotPassword';
import useValidateInputs from '../../../utils/validateInput';
import ForgotPasswordModal from '../../Modals/ForgotPasswordModal';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState<string>('');
  const { forgotPassword, loading, message: resetPasswordSuccess, setMessage } = useForgotPassword();
  const { validateInputs, formErrors, setFormErrors } = useValidateInputs({ errors: { email: '' }, formValues: { email } });

  const onHandleForgotPassword = async () => {
    if (!validateInputs()) return;
    await forgotPassword(email);
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (open === false){
        setEmail('');
        setMessage('');
        setFormErrors({email: ''});
    }
  }, [open, setFormErrors, setMessage])

  return (
    <ForgotPasswordModal 
        open={open} 
        message={resetPasswordSuccess}
        handleClose={handleClose}
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
    </ForgotPasswordModal>
  );
}
