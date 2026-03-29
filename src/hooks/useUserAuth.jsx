import { useContext, useEffect, createContext } from 'react';
import UserContext from '../context/userContext1';

export const UseUserAuth = createContext();

export const useUserAuth = () => {
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        // This hook is now passive; permission check / redirect is handled by PrivateRoute.
        // It preserves auth state during transitions without immediate redirect race.
    }, [user, loading]);

    return { user, loading };
};