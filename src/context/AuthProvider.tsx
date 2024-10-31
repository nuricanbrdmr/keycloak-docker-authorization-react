import { createContext, useState, ReactNode } from "react";

export interface AuthContextType {
    auth: Record<string, unknown>; 
    setAuth: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Record<string, unknown>>({});
    const [persist, setPersist] = useState<boolean>(() => {
        const storedPersist = localStorage.getItem("persist");
        return storedPersist ? JSON.parse(storedPersist) : false;
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
