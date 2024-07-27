import { createSlice } from '@reduxjs/toolkit';

// Function to save cart state to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to load cart state from localStorage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(), // Initialize state from localStorage
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.push({ id, quantity });
            }
            saveCartToLocalStorage(state); // Save updated state to localStorage
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const updatedCart = state.filter(item => item.id !== id);
            saveCartToLocalStorage(updatedCart); // Save updated state to localStorage
            return updatedCart;
        },
        clearCart: () => {
            saveCartToLocalStorage([]); // Save empty state to localStorage
            return [];
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
            saveCartToLocalStorage(state); // Save updated state to localStorage
        },
        setCart: (state, action) => {
            saveCartToLocalStorage(action.payload); // Save updated state to localStorage
            return action.payload;
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;
