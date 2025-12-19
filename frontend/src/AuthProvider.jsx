import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {toast} from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({children, pollInterval = 1000}) => {
    const getTokenFromStorage = () => window.localStorage.getItem('token');

    const [token, setTokenState] = useState(getTokenFromStorage());
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getTokenFromStorage()));

    const applyToken = useCallback((newToken) => {
        setTokenState(newToken);
        setIsAuthenticated(Boolean(newToken));
    }, []);

    const setAuthData = useCallback((auth) => {
        if (!auth) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('roles');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('email');
            applyToken(null);
            window.location = '/auth/login';
            toast('You have been logged out.', {type: 'info'});
            return;
        }

        const {token: newToken, refreshToken, roles, username, email} = auth;
        if (newToken) {
            window.localStorage.setItem('token', newToken);
            if (refreshToken) window.localStorage.setItem('refreshToken', refreshToken);
            if (roles) window.localStorage.setItem('roles', JSON.stringify(roles));
            if (username) window.localStorage.setItem('username', username);
            if (email) window.localStorage.setItem('email', email);
            applyToken(newToken);
        } else {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('roles');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('email');
            applyToken(null);
        }
    }, [applyToken]);

    const logout = useCallback(() => {
        setAuthData(null);
    }, [setAuthData]);

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'token') {
                applyToken(e.newValue);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [applyToken]);

    useEffect(() => {
        let cancelled = false;
        let last = getTokenFromStorage();

        const tick = () => {
            if (cancelled) return;
            const current = getTokenFromStorage();
            if (current !== last) {
                last = current;
                applyToken(current);
            }
        };

        const id = setInterval(tick, pollInterval);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [applyToken, pollInterval]);

    const value = {
        token,
        isAuthenticated,
        setAuthData,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (ctx === null) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
};