import React from 'react';
import Divider  from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import GenericModal from './GenericModal';

interface SessionModalProps {
    loading?: boolean;
    onSubmit?: () => Promise<void>;
}

const SessionModal = ({ loading }: SessionModalProps) => {
    const { open, error, remainingTime, extendSession, logoutUser,  } = useAppContext();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        logoutUser();
        navigate("/");
    }
    
    return (
        <GenericModal open={open}>
            <DialogTitle variant="subtitle1" sx={{pb: 1, display: 'flex', alignItems: 'center'}}>
                {error ? 'Session has expired' : `Your session is about to expire in ${remainingTime} seconds.`}
            </DialogTitle>
            
            <DialogTitle variant="subtitle2" sx={{ pt:0, color: 'text.secondary', fontWeight:'light'}}>
                {error ? 'Please log in again to continue.' : 'Would you like to extend it?'}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <Divider />
            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>
                {!error && <Button onClick={extendSession} data-testid="generic-dialog-submit-button" variant="contained" type="submit" disabled={loading}>
                    Extend Session
                </Button>}

                <Button onClick={handleLogout}>{error ? 'Ok' : 'Log out'}</Button>
            </DialogActions>
        </GenericModal>
    );
}

export default SessionModal