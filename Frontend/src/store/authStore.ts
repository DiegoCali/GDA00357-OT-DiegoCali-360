import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string; 
    role: number;   
    setToken: (token: string) => void;
    setRole: (role: number) => void;
    logout: () => void;
    login: (email: string, password: string) => void;
    getLoggedInUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    token: "",  
    role: -1,  
    setToken: (token) => set({ token }),
    setRole: (role) => set({ role }),
    logout: () => set({ token: "" }),
    login: async (email, password) => {
        try {
            const { message, role, token } = await login(email, password);            
            console.log(message);
            set({ token });
            set({ role });
        } catch (error) {
            console.error("Login failed:", error);
        }
    },
    getLoggedInUser: async () => {
        const token = localStorage.getItem("token");
        if (token) {
            set({ token });
        }
    }
}));