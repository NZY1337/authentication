import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface GenericDialogProps {
    dialogTitle: string;
    dialogSubtitle: string;
    loading?: boolean;
    children?: React.ReactNode;
    onSubmit?: () => Promise<void>;
    dialogActions?: "extend-session" | "forgot-password";
  }

const GenericDialog = ({dialogTitle, dialogSubtitle, loading, children, onSubmit, dialogActions = 'extend-session' }: GenericDialogProps) => {
    const { open, extendSession, logoutUser, error } = useAppContext();
    const navigate = useNavigate(); // Get navigate function
    
    // const handlePreventCloseOutside = (e: Event, reason: string) => {
    //     console.log(reason);
    // }
    
    const handleLogout = async () => {
        logoutUser();
        navigate("/");
    }
    
    return (
        <Dialog open={open}
            PaperProps={{ sx: { backgroundImage: 'none', minWidth: '600px' },
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (onSubmit) {
                        await onSubmit();
                    }
                },
            }}>
                <DialogTitle variant="subtitle1" sx={{pb: 1, display: 'flex', alignItems: 'center'}}>
                    {/* {dialogTitle} {loading && <CircularProgress sx={{ ml: 1}} size={20} color="primary" />} */}
                    {error ? 'Session has expired' : dialogTitle}

                </DialogTitle>
                
                
                <DialogTitle variant="subtitle2" sx={{ pt:0, color: 'text.secondary', fontWeight:'light'}}>
                    {error ? 'Please log in again to continue.' : dialogSubtitle}
                </DialogTitle>

                {children && 
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        {children}
                    </DialogContent>
                }

                <DialogActions sx={{ pb: 3, px: 3 }}>
                    {dialogActions === "extend-session" && 
                        <>
                        {!error && <Button onClick={extendSession} data-testid="generic-dialog-submit-button" variant="contained" type="submit" disabled={loading}>
                            Extend Session
                        </Button>}

                        <Button onClick={handleLogout}>{error ? 'Ok' : 'Log out'}</Button>
                        </>
                    }

                    {dialogActions === "forgot-password" && 
                        <Button data-testid="generic-dialog-submit-button" variant="contained" type="submit" disabled={loading}>
                            Send
                        </Button>
                    }
                </DialogActions>
        </Dialog>
    );
}

export default GenericDialog