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
        const token = localStorage.getItem('token');
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

        <div className=' xsx:w-[70%] xl:w-[60%] mx-auto'>

            <h1 className="text-4xl mt-[15px] text-center font-bold">Final Bill</h1>

            <div className='flex border p-[15px] rounded-xl flex-col'>
                <div className='text-xl font-bold'>Checkout</div>
                <div className='border-b border-t border-gray-400 text-md font-semibold'>
                    <div className='flex mt-[15px] justify-between'>
                        <p>Your Cart Subtotal:</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>{calculateTotalBill()}</p>
                    </div>
                    <div className='flex mt-[8px] justify-between'>
                        <p>Discount Through Applied Sales:</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>{calculateTotalBill()}</p>
                    </div>
                    <div className='flex my-[8px] justify-between'>
                        <p>Delivery Charges (*On Delivery):</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>200</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p className='px-[8px] text-4xl mt-[10px] font-bold rounded-xl'><span className='text-xl font-medium mr-[3px]'>Rs.</span>{calculateTotalBill()}</p>
                    <button onClick={handleConfirmOrder} className="border-2 text-[20px] font-bold mt-[15px] py-[5px] hover:bg-white hover:text-green-800 bg-green-700 border-green-700 rounded-2xl px-[25px] text-white">Place Order</button>
                </div>

            </div>

            <div className="mt-4 md:px-0 px-[8px]">
                {cart.map(item => {
                    const product = products.find(p => p._id === item.id);
                    if (!product) return null;

                    const discountedPrice = product.sale
                        ? product.price - (product.price * product.sale) / 100
                        : product.price;

                    return (
                        <div key={item.id} className="border flex flex-col bg-custom-light-red border-gray-400 rounded-lg p-4 mb-4">
                            <div className="ml-4 flex-1">
                                <div className='flex items-center mt-[8px]'>
                                    <p className='w-[12px] ml-[4px] h-[12px] rounded-full mr-[6px] bg-red-800 '></p>
                                    <h3 className="text-xl xsx:text-2xl mb-[2px] underline font-bold">{product.name || 'Unknown Product'}</h3>
                                </div> 

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900  mr-[5px]'>Quantity:</span>  {item.quantity}
                                </p>

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900  mr-[5px]'>Actual Price:</span>${product.price.toFixed(2)}
                                </p>

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900 mr-[5px]'>Discounted Price through Sales:</span>${discountedPrice.toFixed(2)}
                                </p>

                                <div className='flex justify-between'>
                                    <p className="text-xl ml-[12px] text-red-400 underline font-bold rounded-md p-[5px]">Total Price:</p>
                                    <p  className="text-2xl text-red-800 font-bold rounded-md p-[5px]"><span className='text-lg mr-[4px]'>Rs.</span>{(discountedPrice * item.quantity).toFixed(2)}</p>
                                </div>

                            </div>
                        </div>
                    );
                })}
                
            </div>
        </div>
    );
};

export default OrderList;
