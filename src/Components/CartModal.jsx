import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const panelVariants = {
  hidden: { width: 0 },
  visible: {
    width: 330,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  exit: {
    width: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

const contentVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

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

  return (
    <motion.div
      key={`${id}-${size}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="mb-[25px] border-b-[2px] pb-[10px] border-gray-200"
    >
      <div className="flex gap-4">
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}`}
          alt={product.name}
          className="rounded-lg border-[2px] border-gray-200 w-[60px] h-[80px] object-fit"
        />
        <div className="flex-1">
          <button
            onClick={() => onRemove(id, size)}
            className="text-gray-400 w-full flex justify-end hover:text-red-500 transition-colors"
          >
            <FiTrash2 className="w-4 h-4 mt-[-6px]" />
          </button>
          <h3 className="font-semibold text-[13px] text-gray-900">
            {product.name.slice(0, 27)} {product.name.length > 27 && "..."}
          </h3>
          <div className="text-[12px] text-gray-600 mb-2">
            <p>Size: {size}</p>
          </div>
          <div className="flex items-center space-x-[6px]">
            <button
              onClick={() => onDecrease(id, size)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <FiMinus className="w-3 h-3" />
            </button>
            <span className="font-medium w-4 text-center">{quantity}</span>
            <button
              onClick={() => onIncrease(id, size)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <FiPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CartModal = ({ isOpen, onClose }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const getQuantity = (id, size) => {
    const item = cart.find(product => product.id === id && product.size === size);
    return item ? item.quantity : 1;
  };

  const handleIncreaseQuantity = (id, size) => {
    dispatch(updateQuantity({ id, quantity: getQuantity(id, size) + 1, size }));
  };

  const handleDecreaseQuantity = (id, size) => {
    dispatch(updateQuantity({ id, quantity: Math.max(getQuantity(id, size) - 1, 1), size }));
  };

  const handleRemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

          {/* Expand Width Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-3 bottom-3 right-2 h-auto bg-white z-50 shadow-lg overflow-hidden rounded-lg"
          >
            <div className="flex flex-col h-full">


              {/* Scrollable Products Area */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 overflow-y-auto px-6 py-4 [scrollbar-width:none] [-ms-overflow-style:none]"
              >

                {/* Header */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-bold">Your Cart</h2>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-black text-[28px] mt-[-5px]"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  cart.map((item, index) => (
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
                  ))
                )}
              </motion.div>

              {/* Fixed "Go to Cart" Button */}

              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-6 py-3 bg-white border-t border-gray-200">
                <Link to="/cart">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full flex items-center disabled:bg-gray-400 justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={cart.length === 0}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Go to Cart</span>
                </button>
                </Link>
              </motion.div>

            </div>
          </motion.div>
        </>
      )
      }
    </AnimatePresence >
  );
};

export default CartModal;