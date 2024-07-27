import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
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
        const fetchOrders = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`http://localhost:3001/api/place-order/orders/${userId}`);
                console.log('Fetched orders:', response.data); // Debug log
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    if (!Array.isArray(orders) || !orders.length) {
        return <p>No orders found</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            {orders.map(order => (
                order.orders.map(singleOrder => (
                    <div key={singleOrder._id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">
                            Order Date: {new Date(singleOrder.orderDate).toLocaleDateString()}
                        </h2>
                        <p className="text-lg font-semibold mb-2">
                            Total: ${singleOrder.total ? singleOrder.total.toFixed(2) : 'N/A'}
                        </p>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                            {singleOrder.items.map(item => (
                                <div key={item._id} className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold">{item.name}</h3>
                                        <p className="text-sm">Quantity: {item.quantity}</p>
                                        <p className="text-sm">
                                            Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                                        </p>
                                        <p className="text-sm">
                                            Discounted Price: ${item.discountedPrice ? item.discountedPrice.toFixed(2) : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="text-lg font-bold">
                                        ${item.discountedPrice && item.quantity
                                            ? (item.discountedPrice * item.quantity).toFixed(2)
                                            : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ))}
        </div>
    );
};

export default ShowOrders;
