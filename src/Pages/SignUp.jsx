import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IoLockClosedOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/register`, { email, password });
            setSuccess('Registration successful! Please log in.');
            setError('');
            setTimeout(() => navigate('/signin'), 1000);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            setSuccess('');
        }
    };

    return (
        <main className='flex min-h-[90vh] items-center justify-center bg-gray-50'>
            <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-lg px-8 sm:px-12 py-8 space-y-6 bg-white border-[2px] border-gray-100 rounded-xl shadow-md">
                <div className="space-y-2 text-center">
                    <h1 className='text-3xl font-bold text-red-600'>Create an Account</h1>
                    <p className='text-gray-600'>Create an account for faster checkout</p>
                    <div className='h-1 bg-red-100 w-3/4 mx-auto'></div>
                </div>

                {error && (
                    <div className='p-2 text-red-600 bg-red-50 border border-red-200 rounded-md'>
                        Error: {error}
                    </div>
                )}

                {success && (
                    <div className='p-2 text-green-600 bg-green-50 border border-green-200 rounded-md'>
                        {success}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <div className="flex items-center px-3 mt-2 py-2 border-[2px] rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500">
                            <IoMail className='text-red-700' size={20} />
                            <input
                                type="email"
                                className="w-full ml-2 outline-none"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className='text-sm font-medium text-gray-700'>Password</label>
                        <div className="flex items-center px-3 mt-2 py-2 border-[2px] rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500">
                            <IoLockClosedOutline className='text-red-600' size={20} />
                            <input
                                type="password"
                                className="w-full ml-2 outline-none"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
                        <div className="flex items-center px-3 mt-2 py-2 border-[2px] rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500">
                            <IoLockClosedOutline className='text-white bg-red-600 rounded p-1' size={20} />
                            <input
                                type="password"
                                className="w-full ml-2 outline-none"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full px-4 py-2 text-lg font-medium text-white bg-red-700 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate("/signin")}
                            className="font-medium text-red-600 hover:text-red-700 hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </form>
        </main>
    );
};

export default SignUp;
