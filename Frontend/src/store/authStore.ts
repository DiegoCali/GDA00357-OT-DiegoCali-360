import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string; 
    role: number; 
    user_id: number;  
    cart: number[];
    setToken: (token: string) => void;
    setRole: (role: number) => void;
    setUserId: (user_id: number) => void;
    logout: () => void;
    login: (body: any) => void;    
    addToCart: (product: number) => void;
    removeFromCart: (product: number) => void;    
}

export const useAuth = create<AuthState>((set) => ({
    token: "",  
    role: -1,  
    user_id: -1,
    cart: [],
    setToken: (token) => set({ token }),
    setRole: (role) => set({ role }),
    setUserId: (user_id) => set({ user_id }),
    logout: () => {
        set({ token: "" });
        set({ role: -1 });
        set({ user_id: -1 });
        set({ cart: [] });
    },
    login: async (body: any) => {
        try {
            const { message, user_id, role, token } = await login(body);            
            console.log(message);
            set({ user_id });
            set({ role });
            set({ token });
            set({ cart: [] });
        } catch (error) {
            throw error;
        }
    },
    addToCart: (product: number) => {
        console.log("Product added to cart:", product);
        set((state) => ({ cart: [...state.cart, product] }));        
    },
    removeFromCart: (product: number) => {
        set((state) => ({ cart: state.cart.filter((item) => item !== product) }));
    }    
}));