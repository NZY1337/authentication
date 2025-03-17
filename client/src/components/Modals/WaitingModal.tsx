import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import GenericModal from '../UtilityComponents/GenericModal';
import Typography from '@mui/material/Typography';

import customLoader from "../../assets/motion-blur-2.svg";

interface PhotoGuidModalProps {
    children?: React.ReactNode;
    open: boolean;
    onSubmit?: () => Promise<void>;
    handleClose?: () => void;
}

const WaitingModal = ({ open, handleClose }: PhotoGuidModalProps) => {
    const [loadingStep, setLoadingStep] = useState("Starting...");

    useEffect(() => {
        let step = 0;
        setLoadingStep("Starting..."); 

        const steps = [
            "Uploading to S3...",
            "Validating file...",
            "Generating AI masks...",
            "Finalizing...",
        ];

        const interval = setInterval(() => {
            step++;
            if (step < steps.length) {
                setLoadingStep(steps[step]);
            } else {
                clearInterval(interval);
            }
        }, 3000); 

        return () => clearInterval(interval); 
    }, [open]); 

    return (
        <GenericModal open={open} onClose={handleClose} component="div" minWidth='200px'>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', textAlign: 'center' }}>
                <img src={customLoader} style={{ height: '100px' }} alt="Loading" />
                <Typography margin={0}>{loadingStep}</Typography>
            </DialogContent>
        </GenericModal>
    );
}

export default WaitingModal;
