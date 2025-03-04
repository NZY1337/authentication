/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from '../services/authentication/useAuth';
import useSession from '../services/session/useSession';

export type UserInterface = {
    avatar: string;
    createdAt: string;
    updatedAt: string;
    defaultBillingAddress: number | null;
    defaultShippingAddress: number | null;
    email: string;
    name: string;
    id: string;
    isVerified: boolean;
    role: string;
    remainingTime: number;
    verified: boolean
}

export type AppContextType = {
    error: string | null,
    user: UserInterface | null,
    loading: boolean,
    open: boolean,
    userLoading: boolean,
    loginUser: (data: UserLoginInterface, navigate: NavigateFunction) => void,
    registerUser: (data: UserRegisterInterface) => void,
    logoutUser: () => void,
    getUser: () => void,
    setError: (error: SetStateAction<string | null>) => void
    setUser: (user: SetStateAction<UserInterface | null>) => void,
    handleOpen: () => void,
    handleClose: () => void,
};

export type UserLoginInterface = Pick<UserInterface, 'email'> & {
    password: string;
};

export type UserRegisterInterface = Pick<UserInterface, 'email' | 'name'> & {
    password: string;
    message?: string;
};

const AppContext = createContext<AppContextType>({
    error: null,
    user: null,
    loading: true,
    open: false,
    userLoading: false,
    loginUser: () => { },
    logoutUser: () => { },
    getUser: () => { },
    registerUser: () => { },
    setError: () => { },
    setUser: () => { },
    handleClose: () => { },
    handleOpen: () => { },
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
    const { user, error, loading, open, userLoading, loginUser, registerUser, getUser, logoutUser, setError, setUser, handleOpen, handleClose } = useAuth();
    useSession({ handleOpen, logoutUser, user });
    
    const value = React.useMemo(() => ({
        user,
        error,
        loading,
        open,
        userLoading,
        loginUser,
        logoutUser,
        getUser,
        registerUser,
        setError,
        setUser,
        handleOpen,
        handleClose,
        }), [user, error, loading, open, userLoading, loginUser, logoutUser, getUser, registerUser, setError, setUser, handleOpen, handleClose]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
