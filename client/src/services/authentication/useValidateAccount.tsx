import { useState, useEffect } from 'react';
import fetchData from '../../utils/fetchData';

interface UserValidateAccountInterface {
    email: string | null;
    verificationToken: string | null;
}

interface FetchDataResponse {
    message: string;
    error: string;
}

interface ValidateAccountRequest {
    email: string | null;
    verificationToken: string | null;
}

  export function useValidateAccount({ verificationToken, email }: UserValidateAccountInterface) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const validateAccount = async () => {
        setLoading(true);
        const { resData, error } = await fetchData<ValidateAccountRequest,FetchDataResponse>({
          data: { verificationToken, email }, // Request payload
          url: '/auth/validate',
          method: 'POST',
        });
        if (resData) setMessage(resData?.message);
        if (error) setError(error);
        setLoading(false);
    };
  
    useEffect(() => {
      if (verificationToken && email) {
        validateAccount();
      }
    }, [verificationToken, email]);
  
    return { loading, message, error, validateAccount };
  }
  
