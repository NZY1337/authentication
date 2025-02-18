import { useState } from 'react';
import fetchData from '../../utils/fetchData';

interface ForgotPasswordRequest {
    email: string | null;
}

interface FetchDataResponse {
    message: string;
    error: string;
}

export function useForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
  
    const forgotPassword = async (email: string) => {
        setLoading(true);
        const { resData } = await fetchData<ForgotPasswordRequest, FetchDataResponse>({
            data: { email },
            url: '/auth/forgot-password',
            method: 'POST',
        });

        if (resData) setMessage(resData?.message);
        setLoading(false);
    };
  
    return { loading, message, open, setOpen, handleClickOpen, handleClose, forgotPassword, setMessage };
  }
  
