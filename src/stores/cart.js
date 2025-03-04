import { create } from 'zustand';

export const useCart = create((set) => ({
    Cart: [],
    addToCart: () => set(),
    removeFromCart: () => set(),
    removeAll: () => set(),
}));
