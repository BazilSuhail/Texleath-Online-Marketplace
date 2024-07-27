import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const OrderList = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);

    // Function to decode JWT token
    const decodeToken = useCallback((token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.id; // Adjust according to your JWT structure
    }, []);

    // Get user ID from token when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace with your token retrieval method
        const id = decodeToken(token);
        setUserId(id);
    }, [decodeToken]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponses = await Promise.all(
                    cart.map(item => axios.get(`http://localhost:3001/api/fetchproducts/products/${item.id}`))
                );
                setProducts(productResponses.map(response => response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [cart]);

    const handleConfirmOrder = async () => {
        if (!userId) {
            alert('User not logged in');
            return;
        }

        const order = {
            items: cart.map(item => {
                const product = products.find(p => p._id === item.id);
                const discountedPrice = product?.sale
                    ? product.price - (product.price * product.sale) / 100
                    : product.price;
                return {
                    name: product?.name || 'Unknown Product',
                    price: product?.price || 0,
                    discountedPrice: discountedPrice || 0,
                    quantity: item.quantity
                };
            }),
            orderDate: new Date().toISOString(),
            total: calculateTotalBill()
        };
        console.log(cart);
        console.log(order);
        try {
            await axios.post(`http://localhost:3001/api/place-order/orders/${userId}`, order);
            alert('Order confirmed!');
            dispatch(clearCart());

            console.log(cart);
            await axios.post('http://localhost:3001/api/cartState/cart/save', { userId, items: [] });
            navigate('/profile'); // Redirect to profile or another appropriate page
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to confirm order.');
        }
    };

    const calculateTotalBill = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p._id === item.id);
            if (product) {
                const discountedPrice = product.sale
                    ? product.price - (product.price * product.sale) / 100
                    : product.price;
                return total + (discountedPrice * item.quantity);
            }
            return total;
        }, 0).toFixed(2);
    };

    if (!cart.length) return <p>Your cart is empty</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Order List</h1>
            <div className="mt-4">
                {cart.map(item => {
                    const product = products.find(p => p._id === item.id);
                    if (!product) return null;

                    const discountedPrice = product.sale
                        ? product.price - (product.price * product.sale) / 100
                        : product.price;

                    return (
                        <div key={item.id} className="flex items-center justify-between mb-4 border p-4">
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-bold">{product.name || 'Unknown Product'}</h2>
                                <p className="text-lg">
                                    Price: ${discountedPrice.toFixed(2)}
                                    {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
                                </p>
                                <p className="text-lg font-bold">Quantity: {item.quantity}</p>
                                <p className="text-lg bg-green-600 font-bold rounded-md text-white p-[5px]">
                                    Total Price: ${(discountedPrice * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Total Bill: ${calculateTotalBill()}</h2>
                    <button
                        onClick={handleConfirmOrder}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
