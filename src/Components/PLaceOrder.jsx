import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { FaDollarSign, FaGift, FaTruck, FaTimes } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion'; 
import cart_svg from "../Assets/noOrder.webp";

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: '200px',
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: '0px',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            y: '1-200px',
            transition: { duration: 1, ease: 'easeIn' },
        },
    };

    return (
        <div
            className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
        >
            <motion.div
                className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Confirm Order</h2>
                    <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
                        <FaTimes size={20} />
                    </button>
                </div>
                <p className='mt-4 text-md font-medium'>
                    Are you sure you want to place this order? Once confirmed, you will not be able to modify it.
                </p>
                <div className='flex justify-end mt-6'>
                    <button
                        onClick={onClose}
                        className='bg-red-500 text-white font-semibold px-4 py-2 rounded-lg mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-green-900 text-white px-4 py-2 rounded-lg'
                    >
                        Confirm
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


const OrderList = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const decodeToken = useCallback((token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.id;
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = decodeToken(token);
        setUserId(id);
    }, [decodeToken]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponses = await Promise.all(
                    cart.map(item => axios.get(`${process.env.REACT_APP_API_BASE_URL}/fetchproducts/products/${item.id}`))
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
                    size: item?.size || 'No size Selected',
                    discountedPrice: discountedPrice || 0,
                    quantity: item.quantity
                };
            }),
            orderDate: new Date().toISOString(),
            total: calculateTotalBill()
        };
        console.log(order);

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/place-order/orders/${userId}`, order);
            alert('Order confirmed!');
            dispatch(clearCart());

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/cartState/cart/save`, { userId, items: [] });
            navigate('/profile');
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!cart.length) return <div className='bg-gray-50 h-[calc(100vh-220px)] flex justify-center items-center w-screen'>
        <div className='text-center'>
            <img
                src={cart_svg}
                alt='Cart Icon'
                className='mx-auto lg:scale-[0.88] w-[280px] h-[280px]'
            />
            <p className='px-[15px] py-[6px] rounded-[8px] mt-[8px] text-[20px] text-[#d66868] font-[600] bg-[#ffe8e8] mx-auto text-center '>
                Your cart is empty
            </p>

        </div>
    </div>;

    return (
        <div className='xsx:w-[70%] flex flex-col xl:w-[60%] mx-auto'>
            <h1 className="text-4xl flex items-center mx-auto text-red-900 underline underline-offset-4 mt-[15px] text-center font-bold">
                <FiFileText className='mt-[8px] mr-[5px]' />
                Final Invoice
            </h1>

            <div className='flex border shadow-custom-card mt-[25px] p-[15px] rounded-xl flex-col'>
                <div className='text-2xl font-bold'>Checkout</div>
                <div className='border-b border-t border-gray-400 text-[17px] font-semibold'>
                    <div className='flex mt-[15px] justify-between'>
                        <p className='flex items-center'><FaDollarSign className='text-green-600' />Your Cart Subtotal:</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>{calculateTotalBill()}</p>
                    </div>
                    <div className='flex mt-[8px] justify-between'>
                        <p className='flex items-center'><FaGift className='text-blue-600 mr-2' />Discount Through Applied Sales:</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>{calculateTotalBill()}</p>
                    </div>
                    <div className='flex my-[8px] justify-between'>
                        <p className='flex items-center'><FaTruck className='text-red-600 mr-2' />Delivery Charges (*On Delivery):</p>
                        <p className='px-[8px] text-xl rounded-xl'><span className='text-lg'>Rs.</span>200</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p className='px-[8px] text-4xl mt-[10px] font-bold rounded-xl'>
                        <span className='text-xl font-medium mr-[3px]'>Rs.</span>{calculateTotalBill()}
                    </p>
                    <button
                        onClick={openModal}
                        className="border-2 text-[20px] font-bold mt-[15px] py-[5px] hover:bg-white hover:bg-gradient-to-tl hover:scale-95 transition duration-300 bg-gradient-to-tr from-red-500 via-red-950 to-red-500  border-red-700 rounded-2xl px-[25px] text-red-50"
                    >
                        Place Order
                    </button>
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
                                    <span className='font-semibold text-red-900 mr-[5px]'>Quantity:</span>  {item.quantity}
                                </p>

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900 mr-[5px]'>Selected Size:</span>  {item.size}
                                </p>

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900 mr-[5px]'>Actual Price:</span>${product.price.toFixed(2)}
                                </p>

                                <p className="text-md ml-[20px] font-bold text-black">
                                    <span className='font-semibold text-red-900 mr-[5px]'>Discounted Price through Sales:</span>${discountedPrice.toFixed(2)}
                                </p>

                                <div className='flex justify-between'>
                                    <p className="text-xl ml-[12px] text-red-400 underline font-bold rounded-md p-[5px]">Total Price:</p>
                                    <p className="text-2xl text-red-800 font-bold rounded-md p-[5px]"><span className='text-lg mr-[4px]'>Rs.</span>{(discountedPrice * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => {
                    closeModal();
                    handleConfirmOrder();
                }}
            />
        </div>
    );
};


export default OrderList;
