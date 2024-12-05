// create the component EmailValidation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const EmailValidation = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Typography variant="h6">Email Validation</Typography>
        </div>
    );
};

export default EmailValidation;