import { useState, useEffect, useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import {
  UserLoginInterface,
  UserRegisterInterface,
  UserInterface,
} from "../../context/AppContext";
import fetchData from "../../utils/fetchData";

interface LoginResponse {
  user: UserInterface;
  token: string;
}

interface RegisterResponse {
  user: UserInterface;
  message?: string;
}

interface GetUserResponse {
  user: UserInterface;
}

export function useAuth() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
    
  const handleOpen = useCallback(() => {
    setOpen(true);
  },[]);
  
  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

  const extendSession = async () => {
    const { error } = await fetchData<null, null>({
        url: "/auth/refresh-token",
        method: "POST",
    });

    if (error) return setError(error);
    await getUser();    
    handleClose();
  } 

  const loginUser = async (data: UserLoginInterface, navigate: NavigateFunction) => {
    setLoading(true);

    const { resData, error } = await fetchData<UserLoginInterface, LoginResponse>({
      data,
      url: "/auth/signIn",
      method: "POST",
    });

    if (error) {
      setError(error);
    } else if (resData) {
      setUser(resData.user);
      setRemainingTime(resData.user.remainingTime);   
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const getUser = async () => {
    setLoading(true);

    const { resData, error } = await fetchData<null, GetUserResponse>({
      url: "/auth/user",
      method: "GET",
    });

    if (error) {
      setError("");
    } else if (resData) {
      setUser(resData.user);
      setRemainingTime(resData.user?.remainingTime);
    }

    setLoading(false);
  };

  const registerUser = async (data: UserRegisterInterface) => {
    setLoading(true);

    const { resData, error } = await fetchData<UserRegisterInterface, RegisterResponse>({
      data,
      url: "/auth/signUp",
      method: "POST",
    });

    if (error) {
      setError(error);
    } else if (resData?.message) {
      setError(resData.message);
    } else if (resData) {
      setUser(resData.user);
    }

    setLoading(false);
  };

  const logoutUser = useCallback(async () => {
    setLoading(true);

    const { error } = await fetchData<null, null>({
      url: "/auth/logout",
      method: "DELETE",
    });

    if (error) {
      setError("Failed to log out.");
    } else {
      setRemainingTime(0);
      setUser(null);
      setError(null);
      handleClose();
    }

    setLoading(false);                    
  }, [handleClose]);
                                    
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (user && remainingTime <= 60) {
        interval = setInterval(() => {
            setRemainingTime((prevremainingTime: number) => {
                const newExpiringInterval = prevremainingTime - 1;
                if (newExpiringInterval <= 0) {
                  clearInterval(interval);
                  console.log('Session expired');
                  logoutUser();
                  handleClose();
                  return 0;
                } else if (newExpiringInterval <= 50) {
                    console.log('session expires in: ', newExpiringInterval);
                    handleOpen();
                } else {
                    console.log('session is about to expire in: ', newExpiringInterval);
                }
                return newExpiringInterval;
            });
          }, 1000);
    }
     
    return () => clearInterval(interval);
  }, [logoutUser, remainingTime, user?.remainingTime, user, handleOpen, handleClose]);

  return { user, error, loading, open, handleClose, extendSession, loginUser, getUser, setUser, setError, registerUser, logoutUser, setRemainingTime };
}
