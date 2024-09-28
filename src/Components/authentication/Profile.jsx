import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import ShowOrders from '../ShowOrder';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import MainLoader from '../Pages/mainLoader';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
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
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
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
            } else {
                navigate('/login');
            }
        } catch (error) {
            setError('Failed to fetch profile');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProfile();
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearCart());
        window.location.reload();
        navigate('/login');
    };
    const handle_See_orders = () => {
        navigate('/orders-tracking');
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <div className='h-screen w-screen pt-[-96px]'> <MainLoader /></div>;

    return (
        <div className="w-full flex xsx:flex-row flex-col xsx:p-[15px]">
            <div className='xsx:w-[40%] xsx:p-[0px] p-[15px]'>
                {user.fullName === "" ?
                    <div className='font-bold text-red-500 mb-[25px] text-lg'> * Kindly Before Placing Any Orders.Remember to FIll out Details for Faster Checkout.Only Entered info will be used for Shipping.</div>
                    :
                    <h1 className=" text-[35px] text-red-700 font-bold mb-4">Welcome, <span className='text-black'>{user.fullName}</span></h1>
                }
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.address.city}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.address.street}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.address.country}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Update Profile</button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <div className="flex-column font-medium">
                                Name:
                            </div>
                            <div className="inputForm">
                                {user.fullName}
                            </div>
                        </div>

                        <div>
                            <div className="flex-column font-medium">
                                Email:
                            </div>
                            <div className="inputForm">
                                {user.email}
                            </div>
                        </div>

                        <div>
                            <div className="flex-column font-medium">
                                Contact / Phone:
                            </div>
                            <div className="inputForm">
                                {user.contact}
                            </div>
                        </div>

                        <div>
                            <div className="flex-column font-medium">
                                Country:
                            </div>
                            <div className="inputForm">
                                {user.address?.country}
                            </div>
                        </div>

                        <div>
                            <div className="flex-column font-medium">
                                City:
                            </div>
                            <div className="inputForm">
                                {user.address?.city}
                            </div>
                        </div>

                        <div>
                            <div className="flex-column font-medium">
                                Address:  <p className='text-sm text-red-500'>*Kindly fill the details carefully as this info will be used automatically by the system for shipping</p>
                            </div>
                            <div className="bg-red-200 p-[10px] text-red-950 font-medium mt-[15px] rounded-lg ">
                                {user.address?.street}
                            </div>
                        </div>

                    </div>
                )}
                <div className="mt-4 flex space-x-4">
                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 flex bg-blue-500 text-white rounded-md">
                        <FaRegEdit className='text-[22px] mt-[1.2px] font-bold mr-[5px]' /> {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>

                    <button onClick={handle_See_orders} className="px-4 py-2 bg-green-700 text-white rounded-md">
                        Order History
                    </button>
                </div>
            </div>

            <div className='xsx:w-[60%] xsx:h-[120vh] custom-scrollbar overflow-y-auto'>
                <button onClick={handleLogout} className="px-4 mt-[13px] ml-auto py-2 flex bg-red-500 text-white rounded-md" >
                    <RiLogoutBoxRLine className='text-[22px] mt-[1.2px] font-bold mr-[5px]' />
                    Logout
                </button>

                <ShowOrders />
            </div>

        </div>
    );
};

export default Profile;
