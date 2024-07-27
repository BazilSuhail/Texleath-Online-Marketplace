import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, updateQuantity, setCart } from '../redux/cartSlice';
import axios from 'axios';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    //const userId = 'getUserIdFromJWT'; // Replace with actual function to get user ID from JWT
    const navigate = useNavigate();

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

    const handleRemoveFromCart = id => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = id => {
        dispatch(updateQuantity({ id, quantity: getQuantity(id) + 1 }));
    };

    const handleDecreaseQuantity = id => {
        dispatch(updateQuantity({ id, quantity: Math.max(getQuantity(id) - 1, 1) }));
    };

    const getQuantity = id => {
        const item = cart.find(product => product.id === id);
        return item ? item.quantity : 1;
    };
    const navigateToOrderList = () => {
        navigate("/place-order")
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

    const handleSaveCart = async () => {
        try {
            await axios.post('http://localhost:3001/api/cartState/cart/save', { userId, items: cart });
            alert('Cart saved successfully!');
        } catch (error) {
            console.error('Error saving cart:', error);
            alert('Failed to save cart.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            {cart.length === 0 ? (
                <p>

                    <button onClick={handleSaveCart} className="px-4 py-2 bg-blue-500 text-white ml-4">Save for Later</button>
                    Your cart is empty</p>
            ) : (
                <div>
                    <button onClick={handleClearCart} className="px-4 py-2 bg-red-500 text-white">Clear Cart</button>
                    <button onClick={handleSaveCart} className="px-4 py-2 bg-blue-500 text-white ml-4">Save for Later</button>
                    <button onClick={navigateToOrderList} className="px-4 py-2 bg-blue-500 text-white ml-4">PLace Order</button>
                    <div className="mt-4">
                        {cart.map(item => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                quantity={item.quantity}
                                onIncrease={() => handleIncreaseQuantity(item.id)}
                                onDecrease={() => handleDecreaseQuantity(item.id)}
                                onRemove={() => handleRemoveFromCart(item.id)}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Total Bill: ${calculateTotalBill()}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

const CartItem = ({ id, quantity, onIncrease, onDecrease, onRemove }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/fetchproducts/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return null;

    const discountedPrice = product.sale
        ? (product.price - (product.price * product.sale) / 100).toFixed(2)
        : product.price.toFixed(2);

    return (
        <div className="flex items-center justify-between mb-4 border p-4">
            <img
                src={`/uploads/${product.image}`}
                alt={product.name}
                className="w-100 h-100 object-cover"
            />
            <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-lg">
                    Price: ${discountedPrice}
                    {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
                </p>
                <p className="text-lg bg-green-600 font-bold rounded-md text-white p-[5px]">
                    Total Price: ${(discountedPrice * quantity).toFixed(2)}
                </p>
                <div className="mt-2">
                    <button onClick={onDecrease} className="px-2 py-1 bg-gray-200">-</button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={onIncrease} className="px-2 py-1 bg-gray-200">+</button>
                    <button onClick={onRemove} className="px-4 py-2 bg-red-500 text-white ml-4">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
