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


const SessionModal = () => {
    const { open, handleClose } = useAppContext();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        handleClose();
        navigate("/");
    }
    
    return (
        <GenericModal open={open}>
            <DialogTitle variant="subtitle1" sx={{pb: 1, display: 'flex', alignItems: 'center'}}>
                Your session is about to expire.
            </DialogTitle>
            
            <DialogTitle variant="subtitle2" sx={{ pt:0, color: 'text.secondary', fontWeight:'light'}}>
                Please log in again to continue.
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <Divider />
            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button variant='contained' onClick={handleLogout}>
                    {/* {error ? 'Ok' : 'Log out'} */}
                    Ok
                </Button>
            </DialogActions>
        </GenericModal>
    );
}

export default SessionModal