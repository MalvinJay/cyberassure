import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import LoadingScreen from '../src/components/ui/LoadingScreen';

//api here is an axios instance which has the baseURL set according to the env.
import api from "../services/config";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            console.log('Running loadUserFromCookies');
            const token = Cookies.get('token');
            console.log('token:', token);

            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get("user/get-user-profile");

                if (user) {
                    console.log('Authenticated User:', user);
                    setUser(user)
                }
            } 

            setLoading(false);
        }

        loadUserFromCookies()
    }, []);

    const login = async (email, password) => {
        const { data: token } = await api.post('user/login', { email, password });

        if (token) {
            console.log("Got token")
            Cookies.set('token', token, { expires: 60 })
            api.defaults.headers.Authorization = `Bearer ${token.token}`
            const { data: user } = await api.get('user/get-user-profile')
            setUser(user)
            console.log("Got user", user)
        }

        return token;
    };

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        window.location.pathname = '/login'
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading || (!isAuthenticated)){
      return (
        <div className='h-full w-full'><LoadingScreen /></div>
      ) 
    }
    return children;
};

export default function useAuth() {
    const context = useContext(AuthContext);
    return context;
};
