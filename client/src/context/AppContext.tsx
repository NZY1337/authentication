import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from '../services/authentication/useAuth';

export type UserInterface = {
    name: string;
    createdAt: string;
    defaultBillingAddress: string | null;
    defaultShippingAddress: string | null;
    email: string;
    id: string;
    role: string;
    remainingTime: number
}

export type UserLoginInterface = Pick<UserInterface, 'email'> & {
    password: string;
};

export type UserRegisterInterface = Pick<UserInterface, 'email' | 'name'> & {
    password: string;
    message?: string;
};

const AppContext = createContext<{ 
  error: string | null, 
  user: UserInterface | null, 
  loading: boolean,
  open: boolean,
  loginUser: (data: UserLoginInterface, navigate: NavigateFunction) => void, 
  registerUser: (data: UserRegisterInterface) => void,
  logoutUser: () => void, 
  getUser: () => void,
  handleOpen: () => void,
  handleClose: () => void
}>({
  error: null,
  user: null,
  loading: true,
  open: false,
  loginUser: () => {},
  logoutUser: () => {},
  getUser: () => {},
  registerUser: () => {},
  handleOpen: () => {},
  handleClose: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children } : AppProviderProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  },[]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

  const { user, error, loading, loginUser, registerUser, getUser, logoutUser } = useAuth(handleOpen);

  const value = React.useMemo(() => ({ 
    user, 
    error,
    loading,
    open,
    loginUser, 
    logoutUser, 
    getUser, 
    registerUser,
    handleOpen,
    handleClose
    }),[user, error, loading, open, loginUser, logoutUser, getUser, registerUser, handleOpen, handleClose]
);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
