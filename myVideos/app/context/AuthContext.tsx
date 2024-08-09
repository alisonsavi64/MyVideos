import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import client from '../common/models/repositories/client';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'jwt';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null; }>({
        token: null,
        authenticated: null
    });

    const register = async (email: string, password: string) => {
        try{
            const result =  await client.post('/auth/login', {email, password});

        }catch(e){
            return {error: true, msg: (e as any).response.data.msg}
        }
    }

    const value = {
        onRegister: register
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}