import { create } from 'zustand';

export const useCart = create((set, get) => ({
    items: [],

    addToCart: (item, quantity = 1) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    ),
                };
            }
            return {
                items: [...state.items, { ...item, quantity }],
            };
        }),

    removeFromCart: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

    removeAll: () => set({ items: [] }),

    updateQuantity: (id, quantity) =>
        set((state) => {
            if (quantity <= 0) {
                return {
                    items: state.items.filter((item) => item.id !== id),
                };
            }
            return {
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            };
        }),

    getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

    getTotalPrice: () => {
        return get().items.reduce((total, item) => {
            const priceToUse =
                item.discountedPrice !== undefined &&
                !isNaN(item.discountedPrice)
                    ? item.discountedPrice
                    : item.price;
            const validPrice = !isNaN(priceToUse) ? Number(priceToUse) : 0;
            return total + validPrice * item.quantity;
        }, 0);
    },
}));
