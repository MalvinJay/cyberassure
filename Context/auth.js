import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import LoadingScreen from '../src/components/ui/LoadingScreen';
import { useDispatch } from "react-redux";

//api here is an axios instance which has the baseURL set according to the env.
import api from "../services/config";
import { notification } from 'antd';
import { getProfile } from 'redux/features/profileSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, requiresAuth=true }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');

            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`

                if (requiresAuth) {
                    const { payload: user } = await dispatch(getProfile())    
                    if (user) {
                        setUser(user?.message)
                    }
                }
            } 
            setLoading(false);
        }

        loadUserFromCookies();
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            return api.post('user/login', { email, password })
            .then(async (res) => {
                setLoading(false);

                if (res.data) {
                    if (res.data.status) {
                        notification.success({ message: "Login Success" });
                
                        // Set user auth stuff here in cookies
                        Cookies.set('token', res?.data?.message?.access_token);
                        Cookies.set('user', JSON.stringify(res?.data?.message));
                        api.defaults.headers.Authorization = `Bearer ${res?.data?.message?.access_token}`
        
                        router.push('/app/home');
                    } else {
                        notification.error({ message: <div className='capitalize'>{res?.data?.response?.data?.message}</div> })
                        const { status_code } = res?.data?.response?.data;
        
                        switch (status_code) {
                            case 1006:
                                setshow(true);
                                break;
                        
                            default:
                                break;
                        }
                    }

                    const { payload: user } = await dispatch(getProfile());
                    setUser(user);
                }

                console.log('Response in then:', res);
                resolve(res?.data?.data);
            }, (err) => {
                setLoading(false);
                console.log('Error in then:', err?.data);

                notification.error({ 
                    message: <div className='capitalize'>{err?.response?.data?.message || 'Error'}</div>,
                    description: "An error occured whiles logging in, kindly try again or contact support"
                });
                reject(err);
            })
            .catch((error) => {
                console.log('Error in catch:', error?.data);

                setLoading(false);
                reject(error);
            })
        })
    };

    const logout = () => {        
        setUser(null)
        delete api.defaults.headers.Authorization
        Cookies.remove('token');
        Cookies.remove('user');
        localStorage.clear();
        
        router.push('/').then(() => {
          dispatch({ type: 'RESET' })
        })
    };

    const authenticated = () => {
    const token = Cookies.get('token');
    
    if (token) return true;
    return false;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated(), user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    // console.log('isAuthenticated?', isAuthenticated);
    // console.log('user?', user);

    if (isLoading && !isAuthenticated) {
      return <div className='h-full w-full'><LoadingScreen /></div>;
    }

    if (!isLoading && !isAuthenticated) {
        // notification.error({
        //     message: "Unauthorized"
        // })
        router.push('/login')
        return <div className='h-full w-full'><LoadingScreen /></div>;
    }

    return children;
};

// Define a custom hook to access the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
