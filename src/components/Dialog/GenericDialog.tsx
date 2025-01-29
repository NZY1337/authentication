import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

interface GenericDialogProps {
    open: boolean;
    dialogTitle: string;
    dialogSubtitle: string;
    loading?: boolean;
    children?: React.ReactNode;
    onSubmit?: () => Promise<void>;
    dialogActions?: boolean;
    handleClose: () => void;
  }

const GenericDialog = ({ open, dialogTitle, dialogSubtitle, loading, children, handleClose, onSubmit, dialogActions = true }: GenericDialogProps) => {
    return (
        <Dialog open={open} onClose={handleClose}
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
                    {dialogTitle} {loading && <CircularProgress sx={{ ml: 1}} size={20} color="primary" />}
                </DialogTitle>
                
                <DialogTitle variant="subtitle2" sx={{ pt:0, color: 'text.secondary', fontWeight:'light'}}>{dialogSubtitle}</DialogTitle>

                {children && 
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        {children}
                    </DialogContent>
                }

                {dialogActions && 
                    <DialogActions sx={{ pb: 3, px: 3 }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button data-testid="generic-dialog-submit-button" variant="contained" type="submit" disabled={loading}>
                            Send
                        </Button>
                    </DialogActions>
                }
        </Dialog>
    );
}

export default GenericDialog