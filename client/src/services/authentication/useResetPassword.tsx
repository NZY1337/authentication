import { useState } from 'react';
import fetchData from '../../utils/fetchData';

interface ResetPasswordRequest {
    email: string | null;
}

interface FetchDataResponse {
    message: string;
    error: string;
}

interface ResetPasswordInterface {
    password: string;
    token: string;
    email: string;
}

  export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const resetPassword = async (data:ResetPasswordInterface) => {
        setLoading(true);
        const { resData, error } = await fetchData<ResetPasswordRequest, FetchDataResponse>({
            data,
            url: '/auth/reset-password',
            method: 'POST',
        });
        if (resData) setMessage(resData?.message);
        if (error) setError(error);
        setLoading(false);
    };
  
    return { loading, message, error, resetPassword, setMessage };
  }
  
