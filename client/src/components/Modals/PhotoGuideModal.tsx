import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import GenericModal from '../UtilityComponents/GenericModal';

interface PhotoGuidModalProps {
    children?: React.ReactNode;
    open: boolean;
    onSubmit?: () => Promise<void>;
    handleClose: () => void;
}

const PhotoGuideModalBuilder = ({ children, open, handleClose }: PhotoGuidModalProps) => {
    return (
        <GenericModal open={open} onClose={handleClose} component="div" minWidth='70vw'>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                {children}
            </DialogContent>
        </GenericModal>
    );
}

export default PhotoGuideModalBuilder;