import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance';
import authentication from '../services/authentication';
import { NavigateFunction } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  password: string;
  isExpiringSoon?: number;
}

// Define the interface by picking from User and adding extra properties
type UserLoginInterface = Pick<User, 'email' | 'password'>

const AppContext = createContext<{ 
  error: null, 
  user: User | null, 
  loginUser: (data: UserLoginInterface, navigate: NavigateFunction) => void, 
  registerUser: (data: User, navigate: NavigateFunction) => void,
  logoutUser: () => void, getUser: () => void 
}>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  getUser: () => {},
  registerUser: () => {},
  error: null
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children } : AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionExpirationTime, setSessionExpirationTime] = useState<number>(0);
  const [error, setError] = useState(null)

  // navigate must be passed as a param, useNavigate hook must be used only in the context of a </Router> component.  and AppProvider is not a Component
  const loginUser = async (data: { email: string; password: string }, navigate: NavigateFunction) => {
    const { user, error } = await authentication.loginUser(data);
    if (user) {
        setError(null)
        setUser(user);
        navigate('/', { replace: true });
    } else {
      setError(error)
    }
  };

  const logoutUser = async () => {
    const { success, error } = await authentication.logoutUser();
    if (success) {
        setUser(null);
        setError(null)
        setSessionExpirationTime(0);
    } else {
        setError(error)
    }
  };

  const getUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/user');
        setUser(response?.data?.user);
        setSessionExpirationTime(response?.data?.user?.isExpiringSoon);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.log(error) // 'Unauthorized"
    }
  }

  const registerUser = async (data: { name: string, email: string; password: string }, navigate: NavigateFunction) => {
    const { message, error } = await authentication.registerUser(data);
    console.log(message, error);

    if (error) {
        setError(error);
        return;
    }

    console.log(message)
  };

  useEffect(() => { 
    getUser();
  } , []);
  
  const value = React.useMemo(() => ({ user, loginUser, logoutUser, getUser, error, registerUser }), [error, user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionExpirationTime !== undefined && sessionExpirationTime > 0) {
      interval = setInterval(() => {
        setSessionExpirationTime((prevSessionExpirationTime) => {
            const newExpiringInterval = prevSessionExpirationTime - 1;
            if (newExpiringInterval <= 0) {
              clearInterval(interval);
              console.log('Session expired');
              logoutUser();
              return 0;
            } else if (newExpiringInterval <= 10) {
              console.log('session expires in: ', newExpiringInterval);
            } else {
                console.log('session is about to expire in: ', newExpiringInterval);
            }
            return newExpiringInterval;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionExpirationTime]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
