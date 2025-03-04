import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import GenericModal from './GenericModal';
import { Typography } from '@mui/material';

interface ForgotPasswordModalProps {
    loading?: boolean;
    children?: React.ReactNode;
    open: boolean;
    message: string | null,
    onSubmit?: () => Promise<void>;
    handleClose: () => void;
}

const ForgotPasswordModal = ({ loading, children, open, message, onSubmit, handleClose }: ForgotPasswordModalProps) => {
    return (
        <GenericModal open={open} onClose={handleClose} onSubmit={onSubmit}>
            <DialogTitle variant="subtitle1" sx={{pb: 1, display: 'flex', alignItems: 'center'}}>
                Reset password {loading && <CircularProgress sx={{ ml: 1}} size={20} color="primary" />}
            </DialogTitle> 
            
            <DialogTitle variant="subtitle2" sx={{ pt:0, color: 'text.secondary', fontWeight:'light'}}>
                Enter your account's email address, and we'll send you a link to reset your password. 
                {message && <Typography variant="body2" color='primary.main' mt={1}>{message}</Typography>}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                {children}
            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button data-testid="generic-dialog-submit-button" variant="contained" type="submit" disabled={loading}>
                    Send
                </Button>
            </DialogActions>
        </GenericModal>
    );
}

export default ForgotPasswordModal;