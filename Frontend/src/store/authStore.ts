import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string; 
    role: number; 
    user_id: number;  
    setToken: (token: string) => void;
    setRole: (role: number) => void;
    setUserId: (user_id: number) => void;
    logout: () => void;
    login: (body: any) => void;    
}

export const useAuth = create<AuthState>((set) => ({
    token: "",  
    role: -1,  
    user_id: -1,
    setToken: (token) => set({ token }),
    setRole: (role) => set({ role }),
    setUserId: (user_id) => set({ user_id }),
    logout: () => set({ token: "" }),
    login: async (body: any) => {
        try {
            const { message, user_id, role, token } = await login(body);            
            console.log(message);
            set({ user_id });
            set({ role });
            set({ token });
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
}));