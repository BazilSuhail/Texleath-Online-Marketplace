import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { FaDollarSign, FaGift, FaTruck, FaTimes } from 'react-icons/fa';
import { FiCheck, FiFileText, FiMapPin, FiUser } from 'react-icons/fi';
import cart_svg from "../Assets/noOrder.webp";
import Input from '../utilities/Input';
import Button from '../utilities/Button';
import ProfileInput from '../utilities/ProfileInput';

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


const CartItem = ({ id, size, quantity, index }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return null;

    const discountedPrice = product.sale
        ? product.price - (product.price * product.sale) / 100
        : product.price;

    const isDiscounted = product.sale && discountedPrice < product.price;

    return (
        <motion.div
            key={`${id}-${size}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-3 md:p-6"
        >
            <div className="flex gap-4">
                <img
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                    alt={product.name}
                    className="rounded-lg border-[2px] border-gray-200 w-[110px] h-[120px] object-cover"
                />
                <div className="flex-1">

                    <h3 className="font-semibold mb-3 mt-1 text-gray-900">{product.name}</h3>

                    <div className="text-[12px] md:text-sm text-gray-600 mb-4">
                        <p>Qty: {quantity}</p>
                        <p>Size: {size}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className="flex md:flex-row flex-col items-center">
                            <div className="font-semibold text-[12px] md:text-[16px] text-gray-900">
                                <span className="text-[10px] md:text-[13px] font-[600] text-gray-700">Rs. </span>
                                {discountedPrice.toFixed(2)}
                            </div>
                            {isDiscounted && (
                                <div className="text-[10px] ml-[8px] text-center md:text-[13px] text-gray-500 line-through">
                                    Rs. {product.price.toFixed(2)}
                                </div>
                            )}
                        </div>

                        <div className="font-semibold text-gray-900">
                            <span className="text-[13px] font-[600] text-gray-500">Total Price: </span>
                            {(discountedPrice * quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const Checkout = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isEditing = false;
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    bio: '',
    address: {
      city: '',
      street: '',
      country: ''
    },
    contact: ''
  });

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
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

            setFormData({
            email: response.data.email,
            fullName: response.data.fullName,
            bio: response.data.bio,
            address: response.data.address || { city: '', street: '', country: '' },
            contact: response.data.contact || ''
          });
        }
        else {
          navigate('/login');
        }
      } catch (error) {
        setError('Failed to fetch profile');
      }
    }

    fetchProfile();
  }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponses = await Promise.all(
                    cart.map(item => axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products/${item.id}`))
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
                    image: product?.image || 'Unknown Product',
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
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/place-order/orders/${userId}`, order);
            alert('Order confirmed!');
            dispatch(clearCart());

            await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/cartState/cart/save`, { userId, items: [] });
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

    const calculateActualTotalBill = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p._id === item.id);
            if (product) {
                return total + (product.price * item.quantity);
            }
            return total;
        }, 0).toFixed(2);
    };

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
        <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-5">
                <h1 className="text-[25px] font-bold text-gray-900">Checkout Invoice</h1>
                <p className="text-gray-600">Review your items and proceed to checkout</p>
            </div>

            {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pb-16">
                    <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Button className="bg-black hover:bg-gray-800">
                        <Link to="/productlist/All" className="flex items-center">
                            Continue Shopping
                            <FiArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-3 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-gray-50 rounded-lg pb-6 pt-4 px-6 h-fit border-[2px] border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">Rs {calculateActualTotalBill()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-medium">{calculateTotalBill()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Rs. 200</span>
                                </div>

                                <hr className="border-gray-200" />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>Rs. {(Number(calculateTotalBill()) + Number(200)).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-800">Add Rs. {(Number(calculateTotalBill()) + Number(100)).toFixed(2)} more to get free shipping!</p>
                            </div>

                            <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
                                    <button 
                                    onClick={handleConfirmOrder}
                                    className="w-full py-2 bg-gradient-to-r from-red-700 to-red-900 flex items-center justify-center rounded-[8px] hover:bg-gray-800 text-white">
                                       <FiCheck className="mr-2" />
                            Place Order
                                    </button>
                                    

                                <Link to="/products/All">
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>

                            </div>
                        </motion.div>
                        {cart.map((item, index) => (
                            <CartItem
                                key={`${item.id}-${item.size}`}
                                id={item.id}
                                size={item.size}
                                quantity={item.quantity}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Order Summary */}
 <div className="gap-6 lg:col-span-2">
                {/* Personal Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiUser className="mr-2 text-red-600" />
                      Personal Details
                    </h3>
                    <div className="space-y-4">
                      <ProfileInput
                        label="Full Name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                      <ProfileInput
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                      <ProfileInput
                        label="Phone Number"
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiMapPin className="mr-2 text-red-600" />
                      Address Information
                    </h3>
                    <div className="space-y-4">
                      <ProfileInput
                        label="Street Address"
                        value={formData.address.street}
                        onChange={(e) => handleAddressInputChange("street", e.target.value, "address")}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <ProfileInput
                          label="City"
                          value={formData.address.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <ProfileInput
                          label="State"
                          value={formData.address.state}
                          onChange={(e) => handleAddressInputChange("state", e.target.value, "address")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <ProfileInput
                        label="Country"
                        value={formData.address.country}
                        onChange={(e) => handleAddressInputChange("country", e.target.value, "address")}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
                </div>
            )}
        </div>
    );
};


export default Checkout;
