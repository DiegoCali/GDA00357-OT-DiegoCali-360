import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string; 
    role: number; 
    user_id: number;  
    customer_id: number;
    cart: { id: number, quantity: number }[];
    setToken: (token: string) => void;
    setRole: (role: number) => void;
    setUserId: (user_id: number) => void;
    setCustomerId: (customer_id: number) => void;
    logout: () => void;
    login: (body: any) => void;    
    addToCart: (product: number, quantity: number) => void;
    removeFromCart: (product: number) => void;    
}

export const useAuth = create<AuthState>((set) => ({
    token: "",  
    role: -1,  
    user_id: -1,
    customer_id: -1,
    cart: [],    
    setToken: (token) => set({ token }),
    setRole: (role) => set({ role }),
    setUserId: (user_id) => set({ user_id }),    
    setCustomerId: (customer_id) => set({ customer_id }),
    logout: () => {
        set({ token: "" });
        set({ role: -1 });
        set({ user_id: -1 });
        set({ customer_id: -1 });
        set({ cart: [] });
    },
    login: async (body: any) => {
        try {
            const { message, user_id, role, token, customer_id } = await login(body);            
            console.log(message);
            set({ user_id });
            set({ role });
            set({ token });
            set({ cart: [] });
            if (customer_id) {
                set({ customer_id });
            }
        } catch (error) {
            throw error;
        }
    },
    addToCart: (product: number, quantity: number) => {
        console.log("Product added to cart:", product);
        set((state) => {
            const index = state.cart.findIndex((item) => item.id === product);
            if (index !== -1) {
                state.cart[index].quantity += quantity;
                return { cart: state.cart };
            }
            return { cart: [...state.cart, { id: product, quantity }] };
        });
    },
    removeFromCart: (product: number) => {
        console.log("Product removed from cart:", product);
        set((state) => ({ cart: state.cart.filter((item) => item.id !== product) }));
    }    
}));