import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FiX,
    FiCheck,
    FiClock,
    FiTruck,
    FiPackage,
    FiCreditCard,
    FiCalendar,
    FiGift,
    FiArrowRight,
    FiEye,
} from "react-icons/fi"
import { Link } from "react-router-dom"
import axios from "axios"
import Button from "../utilities/Button"
import Badge from "../utilities/Badge"
 
// const Badge = ({ children, variant = "default", className = "" }) => {
//     const variants = {
//         default: "bg-gray-100 text-gray-800",
//         success: "bg-green-100 text-green-800",
//         warning: "bg-yellow-100 text-yellow-800",
//         info: "bg-blue-100 text-blue-800",
//         danger: "bg-red-100 text-red-800",
//     }

//     return (
//         <span
//             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
//         >
//             {children}
//         </span>
//     )
// }

const StatusIcon = ({ status }) => {
    const iconProps = { className: "w-5 h-5" }

    switch (status) {
        case "delivered":
            return <FiCheck {...iconProps} className="w-5 h-5 text-green-600" />
        case "shipped":
            return <FiTruck {...iconProps} className="w-5 h-5 text-blue-600" />
        case "processing":
            return <FiPackage {...iconProps} className="w-5 h-5 text-yellow-600" />
        default:
            return <FiClock {...iconProps} className="w-5 h-5 text-red-500" />
    }
}


const OrderCard = ({ order, onViewDetails }) => {
    const totalSavings = order.items.reduce((total, item) => {
        return total + ((item.price * item.quantity) - (item.discountedPrice * item.quantity));
    }, 0);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-100 px-6 py-4 border-[2px] border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <StatusIcon status={order.status} />
                        </div>
                        <div>
                            <h3 className="font-[600] text-gray-900 text-md">{order._id}</h3>
                            <p className="text-sm font-[600] text-gray-500 flex items-center">
                                <FiCalendar className="w-4 h-4 mr-1" />
                                {new Date(order.orderDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div> 
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Items Preview */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Items ({order.items.length})</h4>
                        <Button variant="ghost" size="sm" onClick={() => onViewDetails(order)}>
                            <FiEye className="w-4 h-4 mr-1" />
                            View Details
                        </Button>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                        {order.items.slice(0, 3).map((item) => (
                            <div key={item._id} className="flex-shrink-0">
                                <img
                                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${item.image}`}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover border border-gray-200"
                                />
                            </div>
                        ))}
                        {order.items.length > 3 && (
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                <span className="text-sm font-medium text-gray-600">+{order.items.length - 3}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 border-[2px] border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-bold text-xl text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 ? (
                        <div className="flex items-center justify-between">
                            <span className="text-green-600 text-sm flex items-center">
                                <FiGift className="w-4 h-4 mr-1" />
                                You saved
                            </span>
                            <span className="font-semibold text-green-600">${totalSavings.toFixed(2)}</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-500 text-sm flex items-center">
                                <FiGift className="w-4 h-4 mr-1" />
                                No savings
                            </span>
                            <span className="text-sm text-gray-400">Look out for deals!</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!order) return null

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalSavings = order.items.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
    const shipping = 9.99
    const tax = subtotal * 0.08

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40  flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-950 to-red-900 text-white px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-gray-300 flex items-center mb-1">
                                    <FiCalendar className="w-4 h-4 mr-2" />
                                    Ordered on {new Date(order.orderDate).toLocaleDateString()}
                                </h3>
                                <div className="flex items-center space-x-3">
                                    {/* <StatusBadge status={order.status} />
                                     */}
                                     <Badge variant={"pending"}>Pending</Badge>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] max-h-[calc(90vh-120px)]">
                            <div className="p-6">
                                {/* Order Items */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <FiPackage className="w-5 h-5 mr-2" />
                                        Items ({totalItems})
                                    </h3>
                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${item.image}`}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg object-cover border border-gray-200"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                    <div className="mt-1 text-sm text-gray-600">
                                                        Size: {item.size}
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-600">
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">${item.price.toFixed(2)}</div>
                                                    {item.discountedPrice < item.price && (
                                                        <div className="text-sm text-gray-500  text-center line-through">${item.discountedPrice.toFixed(2)}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols- 2 gap-8">
                                    {/* Order Summary */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                            <FiCreditCard className="w-5 h-5 mr-2" />
                                            Order Summary
                                        </h3>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                                </div>
                                                {totalSavings > 0 && (
                                                    <div className="flex justify-between text-green-600">
                                                        <span>Savings</span>
                                                        <span className="font-medium">-${totalSavings.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Shipping</span>
                                                    <span className="font-medium">${shipping.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tax</span>
                                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                                </div>
                                                <div className="border-t border-gray-300 pt-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                                        <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Orders() {
    const [userorders, setUserOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState("all")

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
        const fetchOrders = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/place-order/orders/${userId}`);
                //console.log(response.data); // Debug log
                setUserOrders(response.data);
            }
            catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b bg-gray-50 to-gray-100">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-red-900 mb-2">My <span className="text-red-600">Orders</span></h1>
                    <p className="text-red-700 font-[600]">Track and manage your order history</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{userorders?.activeOrders?.length + userorders?.completedOrders?.length}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <FiPackage className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Delivered</p>
                                <p className="text-2xl font-bold text-green-600">{userorders?.activeOrders?.length}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FiCheck className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Processing</p>
                                <p className="text-2xl font-bold text-yellow-600">{userorders?.completedOrders?.length}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <FiClock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 inline-flex">
                        {[
                            { key: "all", label: "All Orders" },
                            { key: "active", label: "Processing" },
                            { key: "completed", label: "Delivered" },
                        ].map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setFilterStatus(filter.key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === filter.key
                                    ? "bg-black text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Orders Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                >
                    {filterStatus === "active" && <>
                        {userorders?.activeOrders?.length > 0 ? (
                            userorders.activeOrders.map((order, index) => (
                                <motion.div key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <OrderCard order={order} onViewDetails={handleViewDetails} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )} </>
                    }
                    {filterStatus === "completed" && <>
                        {userorders?.completedOrders?.length > 0 ? (
                            userorders.completedOrders.map((order, index) => (
                                <motion.div key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <OrderCard order={order} onViewDetails={handleViewDetails} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )} </>
                    }
                    {filterStatus === "all" && <>
                        {userorders?.activeOrders?.length > 0 ? (
                            userorders.activeOrders.map((order, index) => (
                                <motion.div key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <OrderCard order={order} onViewDetails={handleViewDetails} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                        {userorders?.completedOrders?.length > 0 ? (
                            userorders.completedOrders.map((order, index) => (
                                <motion.div key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <OrderCard order={order} onViewDetails={handleViewDetails} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                    </>
                    }
                </motion.div>

                {(userorders?.completedOrders?.length === 0 || userorders?.activeOrders?.length === 0) && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiPackage className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
                        <Button size="lg">
                            <Link to="/products" className="flex items-center">
                                Start Shopping
                                <FiArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                )}

            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal order={selectedOrder} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
