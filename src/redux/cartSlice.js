import { createSlice, createSelector } from '@reduxjs/toolkit';
 
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};
 
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity, size } = action.payload;
            const existingProduct = state.find(item => item.id === id && item.size === size);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.push({ id, quantity, size });
            }
            saveCartToLocalStorage(state);  
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            const updatedCart = state.filter(item => item.id !== id || item.size !== size);
            saveCartToLocalStorage(updatedCart); 
            return updatedCart;
        },
        clearCart: () => {
            saveCartToLocalStorage([]);
            return [];
        },
        updateQuantity: (state, action) => {
            const { id, quantity, size } = action.payload;
            const existingProduct = state.find(item => item.id === id && item.size === size);
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

// Selector to get cart length
export const selectCartLength = createSelector(
    state => state.cart, // Selector function to get the cart state from Redux store
    cart => cart.length // Compute the length of the cart
);
