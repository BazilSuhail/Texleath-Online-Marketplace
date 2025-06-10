import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiSave,
  FiX,
  FiCamera,
  FiShoppingBag,
  FiMenu,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiPackage,
  FiCreditCard,
} from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import MainLoader from "../Pages/mainLoader"
import axios from "axios"
import Button from "../utilities/Button"
import Card from "../utilities/Card"
import ProfileInput from "../utilities/ProfileInput"

// Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  contact: "+1 (555) 123-4567",
  address: {
    street: "123 Fashion Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "January 2023",
  totalOrders: 12,
  totalSpent: 1249.99,
}

// Custom Components
// const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

//   const variants = {
//     primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
//     outline: "border-2 border-red-500 text-red-600 hover:bg-red-50 focus:ring-red-500",
//     secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
//     ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
//   }

//   const sizes = {
//     sm: "px-3 py-2 text-sm rounded-lg",
//     md: "px-4 py-3 text-sm rounded-lg",
//     lg: "px-6 py-4 text-base rounded-xl",
//   }

//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

//   return (
//     <button className={classes} {...props}>
//       {children}
//     </button>
//   )
// }

// const ProfileInput = ({ label, error, className = "", ...props }) => {
//   return (
//     <div className="space-y-1">
//       {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
//       <input
//         className={`flex h-12 w-full rounded-lg border-2 ${error ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-red-500"
//           } bg-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0 transition-colors ${className}`}
//         {...props}
//       />
//       {error && <p className="text-sm text-red-600">{error}</p>}
//     </div>
//   )
// }

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    danger: "bg-red-100 text-red-800",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}



export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  // const [formData, setFormData] = useState({
  //   name: mockUser.name,
  //   email: mockUser.email,
  //   contact: mockUser.contact,
  //   street: mockUser.address.street,
  //   city: mockUser.address.city,
  //   state: mockUser.address.state, 
  //   country: mockUser.address.country,
  // })
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   contact: '',
  //   street: '',
  //   city: '',
  //   state: '',
  //   country: ''
  // });
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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          setUser(response.data);

          setFormData({
            email: response.data.email,
            fullName: response.data.fullName,
            bio: response.data.bio,
            address: response.data.address || { city: '', street: '', country: '' },
            contact: response.data.contact || ''
          });
        }
        else {
          navigate('/signin');
        }
      } catch (error) {
          navigate('/signin');
          // setError('Failed to fetch profile');
      }
    }

    fetchProfile();
  }, [navigate]);


  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAddressInputChange = (field, value, parent = null) => {
    if (parent) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };


  const handleSave = async () => {
    // Here you would typically save to your backend
    //console.log("Saving user data:", formData)
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIsEditing(false);
    } 
    catch (error) {
      setError('Failed to update profile');
    }

    //setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      email: user.email,
      fullName: user.fullName,
      bio: user.bio,
      address: user.address || { city: '', street: '', country: '', state: '' },
      contact: user.contact || ''
    });
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearCart());
    window.location.reload();
    navigate('/signin');
  };


  if (error) return <p className="text-red-500 mx-[25px] bg-red-100 py-[4px] px-[15px] rounded-lg">{error}</p>;
  if (!user) return <div className='h-screen w-screen pt-[-96px]'> <MainLoader /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FiUser className="mr-3 text-red-600" />
            <span>
              My <span className="text-red-600">Profile</span>
            </span>
          </h1>
          <p className="text-gray-600 text-[14px] mt-2">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="text-center mb-6">
                {/* <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={mockUser.avatar || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <FiCamera className="w-4 h-4" />
                  </button>
                </div> */}
                <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
                <p className="text-gray-600">Member since {mockUser.joinDate}</p>
              </div>

              <section className="">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-red-600 bg-red-50 rounded-lg font-medium"
                >
                  <FiUser className="mr-3" />
                  Profile Information
                </Link>
                <Link
                  to="/orders-tracking"
                  className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FiPackage className="mr-3" />
                  Order History
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FiSettings className="mr-3" />
                  Settings
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FiLogOut className="mr-3" />
                  Sign Out
                </button>
              </section>
            </Card>

            {/* Stats Card */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-bold text-gray-900">{mockUser.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-bold text-green-600">${mockUser.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Status</span>
                  <Badge variant="success">Premium</Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <FiEdit3 className="mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleCancel}>
                      <FiX className="mr-2" />
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      <FiSave className="mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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

              {/* Contact Information Display (when not editing) */}
              {!isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Contact Info</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900 truncate">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FiPhone className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{formData.contact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl md:col-span-2">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FiMapPin className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
