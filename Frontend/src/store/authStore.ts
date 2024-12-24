import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string;
    setToken: (token: string) => void;
    logout: () => void;
    login: (email: string, password: string) => void;
    getLoggedInUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    token: "",    
    setToken: (token) => set({ token }),
    logout: () => set({ token: "" }),
    login: async (email, password) => {
        try {
            const token = await login(email, password);
            set({ token });
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