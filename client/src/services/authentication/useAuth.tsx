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
  const [open, setOpen] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true); 

  const handleOpen = useCallback(() => {
    setOpen(true);
  },[]);
  
  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

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
      navigate("/dashboard");
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
      setUser(null);
      setError(null);
    }

    setLoading(false);                    
  }, []);

  const getUser = useCallback(async () => {
    setLoading(true);
    setUserLoading(true);
    const { resData, error } = await fetchData<null, GetUserResponse>({
      url: "/auth/user",
      method: "GET",
    });
    
    if (error) {
      setError("");
    } else if (resData) {
        setUser(resData.user);
    }

    setLoading(false);
    setUserLoading(false);
  },[setUser, setError, setLoading]);

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

  
  useEffect(() => {
    getUser();
  }, []);

  return { user, error, loading, open, userLoading, handleClose, handleOpen, loginUser, getUser, setUser, setError, registerUser, logoutUser };
}
