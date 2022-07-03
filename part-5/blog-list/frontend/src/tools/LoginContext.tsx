import { createContext, useContext, useState } from 'react';

const LoginContext = createContext({ username: '', token: '', setUser: (username: string, token: string) => { } });

export function useLogin() {
    const context = useContext(LoginContext);
    if (context === undefined)
        throw new Error('useLogin must be used within a LoginProvider');
    return context;
}

export function LoginProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    
    const setUser = (username: string, token: string) => {
        localStorage.setItem('user', JSON.stringify({ username, token }));
        setUsername(username);
        setToken(token);
    };

    return (
        <LoginContext.Provider value={{ username, token, setUser }}>
            {children}
        </LoginContext.Provider>
    );
}