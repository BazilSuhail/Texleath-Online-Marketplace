import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import axios from "axios"
import Button from "../utilities/Button"
import { FaSave, FaTrashAlt } from "react-icons/fa"


// Custom Components
// const Button = ({ children, variant = "primary", size = "md", className = "", asChild, ...props }) => {
//     const baseClasses =
//         "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

//     const variants = {
//         primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
//         outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
//         secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
//     }

//     const sizes = {
//         sm: "px-3 py-2 text-sm rounded-md",
//         md: "px-4 py-2 text-sm rounded-md",
//         lg: "px-6 py-3 text-base rounded-lg",
//     }

//     const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

//     if (asChild && children?.type === Link) {
//         return (
//             <Link {...children.props} className={classes}>
//                 {children.props.children}
//             </Link>
//         )
//     }

//     return (
//         <button className={classes} {...props}>
//             {children}
//         </button>
//     )
// }

const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
}

const Separator = ({ className = "" }) => {
    return <hr className={`border-gray-200 ${className}`} />
}



const CartItem = ({ id, size, quantity, onIncrease, onDecrease, onRemove, index }) => {
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
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <button
                            onClick={() => onRemove(id, size)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FiTrash2 className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-[12px] md:text-sm text-gray-600 mb-3">
                        <p>Size: {size}</p>
                        <p>Price Count: {(discountedPrice * quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => onDecrease(id, size)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="font-medium w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => onIncrease(id, size)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <FiPlus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold text-gray-900">
                                <span className="text-[13px] font-[600] text-gray-700">Rs. </span>
                                {discountedPrice.toFixed(2)}
                            </div>
                            {isDiscounted && (
                                <div className="text-[11px] text-center md:text-sm text-gray-500 line-through">
                                    Rs. {product.price.toFixed(2)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const decodeToken = useCallback((token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.id;
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
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
                    cart.map(item => axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products/${item.id}`))
                );
                setProducts(productResponses.map(response => response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [cart]);


    const handleRemoveFromCart = (id, size) => {
        dispatch(removeFromCart({ id, size }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = (id, size) => {
        dispatch(updateQuantity({ id, quantity: getQuantity(id, size) + 1, size }));
    };

    const handleDecreaseQuantity = (id, size) => {
        dispatch(updateQuantity({ id, quantity: Math.max(getQuantity(id, size) - 1, 1), size }));
    };

    const getQuantity = (id, size) => {
        const item = cart.find(product => product.id === id && product.size === size);
        return item ? item.quantity : 1;
    };

    const navigateToOrderList = () => {
        navigate("/checkout")
    };

    const calculateTotalBill = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p._id === item.id);
            if (product) {
                const discountedPrice = product.sale
                    ? (product.price - (product.price * product.sale) / 100)
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

    const handleSaveCart = async () => {
        try {
            console.log(cart);
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/cartState/cart/save`, { userId, items: cart });
            alert('Cart saved successfully!');
        } catch (error) {
            console.error('Error saving cart:', error);
            alert('Failed to save cart.');
        }
    };

    // =====================

    // const updateQuantity = (id, newQuantity) => {
    //     if (newQuantity === 0) {
    //         removeItem(id)
    //         return
    //     }
    //     setProducts(products.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    // }

    // const removeItem = (id) => {
    //     setProducts(products.filter((item) => item.id !== id))
    // }

    // const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    // const shipping = subtotal > 100 ? 0 : 9.99
    // const tax = subtotal * 0.08
    // const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
                <p className="text-gray-600">Review your items and proceed to checkout</p>
            </div>

            {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
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
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* {cart.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${item.size}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-lg p-6"
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${item.image}`}
                                        alt={item.name}
                                        className="rounded-lg w-[120px] h-[120px] object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.id, item.size)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-4 mb-6">
                                            <p>Size: {item.size}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.id, item.size)}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                >
                                                    <FiMinus className="w-4 h-4" />
                                                </button>
                                                <span className="font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item.id, item.size)}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-900">
                                                    <span className="text-[13px] font-[600] text-gray-700">Rs. </span>
                                                    {item.sale && `${(item.price - (item.price * item.sale) / 100).toFixed(2)}`}
                                                </div>
                                                {item.sale && (item.price - (item.price * item.sale) / 100) < item.price && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        Rs. {item.price.toFixed(2)}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))} */}

                        {cart.map((item, index) => (
                            <CartItem
                                key={`${item.id}-${item.size}`}
                                id={item.id}
                                size={item.size}
                                quantity={item.quantity}
                                onIncrease={handleIncreaseQuantity}
                                onDecrease={handleDecreaseQuantity}
                                onRemove={handleRemoveFromCart}
                                index={index}
                            />
                        ))}

                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gray-50 rounded-lg p-6 h-fit sticky top-24"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
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
                            <Separator />
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>Rs. {(Number(calculateTotalBill()) + Number(200)).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800">Add Rs. {(Number(calculateTotalBill()) + Number(100)).toFixed(2)} more to get free shipping!</p>
                        </div>

                        <div className="mb-5 h-[68px] overflow-hidden">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Cart Options</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveCart}
                                    className="group flex items-center justify-center py-[6px] px-[12px] rounded-[8px] text-green-50 font-[600] text-[13px] bg-green-700 hover:bg-green-800 transition-all overflow-hidden"
                                >
                                    <FaSave className="text-green-50 text-[15px] group-hover:mr-2 mb-[1px] transition-all" />
                                    <span className="hidden group-hover:inline whitespace-nowrap mb-[1px] transition-all">
                                        Save Cart
                                    </span>
                                </button>

                                 <button
                                    onClick={handleClearCart}
                                    className="group flex items-center justify-center py-[6px] px-[12px] rounded-[8px] text-red-50 font-[600] text-[13px] bg-red-700 hover:bg-red-800 transition-all overflow-hidden"
                                >
                                    <FaTrashAlt className="text-grredeen-50 text-[15px] group-hover:mr-2 transition-all" />
                                    <span className="hidden group-hover:inline whitespace-nowrap mb-[1px] transition-all">
                                        Clear Cart
                                    </span>
                                </button>
                                {/* <button onClick={handleClearCart} className="flex items-center py-[6px] px-[12px] rounded-[8px] text-white text-[13px] bg-red-700" variant="blue">
                                    <FaTrashAlt className="mr-2 text-white" /> Clear Cart
                                </button> */}
                            </div>
                        </div>
                        <Link to="/checkout">
                            <Button className="w-full bg-red-900 hover:bg-red-800 fo text-white mb-4" size="lg">
                                Proceed to Checkout
                            </Button>
                        </Link>


                        <Button variant="outline" className="w-full">
                            <Link to="/products/All">Continue Shopping</Link>
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
