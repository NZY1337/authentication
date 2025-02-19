import React from 'react';
import Dialog from '@mui/material/Dialog';


interface GenericModalProps {
    children: React.ReactNode,
    open?: boolean
    onClose?: () => void
    onSubmit?: () => Promise<void>;
}

const GenericModal = ({ children, open, onClose, onSubmit }: GenericModalProps) => {
    return (
        <Dialog open={open ?? false} 
            onClose={onClose}
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
                {children}
        </Dialog>
    );
}

export default GenericModal