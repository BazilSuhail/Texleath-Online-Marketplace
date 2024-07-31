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
            <h1 className="text-[28px] font-bold text-red-900 mb-[3px]">Orders Placed</h1>
            {orders.map(order => (
                order.orders.map(singleOrder => (
                    <div key={singleOrder._id} className="border  flex flex-col bg-custom-light-red border-gray-400 rounded-lg p-4 mb-4">

                        <div className='flex xsx:flex-row flex-col justify-between xsx:items-center'>
                            <p className="text-md xsx:text-xl px-[8px] rounded-lg border border-yellow-400 text-yellow-800 bg-yellow-100 font-bold mb-2">
                                <span className='font-medium mr-[5px]'> Days Passed:</span>
                                {Math.floor((new Date() - new Date(singleOrder.orderDate)) / (1000 * 60 * 60 * 24))}<span className='font-medium xsx:text-[18px] ml-[2px]'>days</span>
                            </p>
                            <h2 className="text-lg bg-red-700 flex items-center px-[12px] rounded-xl text-white font-bold mb-2">
                                <span className='text-sm font-normal mb-[2px] mr-[10px]'>Order Date: </span>{new Date(singleOrder.orderDate).toLocaleDateString()}
                            </h2>
                        </div>

                        <p className="text-md flex items-center xsx:ml-auto bg-green-200 text-green-800 border border-green-800 px-[15px] rounded-2xl font-bold mb-2">
                            Bill Checkout: <span className='font-bold ml-[6px] text-xl text-green-900'>${singleOrder.total ? singleOrder.total.toFixed(2) : 'N/A'}</span>
                        </p>
                        <div className="border-t border-gray-500 mt-2 pt-2">
                            {singleOrder.items.map(item => (
                                <div key={item._id} className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className='flex items-center mt-[8px]'>
                                            <p className='w-[12px] ml-[4px] h-[12px] rounded-full mr-[6px] bg-red-800 '></p>
                                            <h3 className="text-xl mb-[2px] underline font-bold">{item.name}</h3>
                                        </div>
                                        <p className="text-md ml-[20px] font-bold text-black">
                                            <span className='font-semibold text-red-900 '>Quantity:</span>  {item.quantity}
                                        </p>

                                        <p className="text-md ml-[20px] font-bold text-black">
                                            <span className='font-semibold text-red-900 '>Price:</span> ${item.price ? item.price.toFixed(2) : 'N/A'}
                                        </p>

                                        <p className="text-md ml-[20px] font-bold text-black">
                                            <span className='font-semibold text-red-900 '> Discounted Price through Sale/Coupons: </span>  ${item.discountedPrice ? item.discountedPrice.toFixed(2) : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="text-lg bg-red-100 border border-red-700 text-red-800 px-[15px] rounded-3xl py-[2px] font-bold">
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
