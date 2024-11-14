import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IoLockClosedOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const Register = () => {
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
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            setSuccess('');
        }
    };

    return (
        <main className='flex  xsx:pt-[150px] pt-[120px] min-h-screen flex-col  items-center justify-center'>
            <form onSubmit={handleSubmit} className="w-[100vw] sm:w-[520px] form ">
                <div className='text-red-800 text-[35px] text-center font-bold'>Create an Account</div>
                <div className='text-red-800 text-[15px] text-center font-medium'>Create an account for faster checkout</div>
                <div className='h-[3px] bg-red-200 w-[90%] mx-auto mb-[15px]'></div>
 
                {error && <div className='text-red-500 p-[5px] border-2 border-red-600 rounded-md'>Error: {error}</div>}
                {error && <div className='text-green-500 p-[5px] border-2 border-green-600 rounded-md'>{success}</div>}
                <div className="flex-column">
                    <label>Email </label>
                </div>
                <div className="inputForm">
                    <IoMail className='text-red-800' size={23} />
                    <input type="email"
                        className="input" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email" />
                </div>

                <div className="flex-column">
                    <label>Password </label>
                </div>
                <div className="inputForm">
                    <IoLockClosedOutline className='text-red-800' size={23} />
                    <input
                        className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your Password" />
                </div>

                <div className="flex-column">
                    <label>Confirm Password </label>
                </div>
                <div className="inputForm">
                    <IoLockClosedOutline className='bg-red-800 rounded-md text-white p-[3px]' size={25} />
                    <input className="input"

                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password" />
                </div>

                <button className="button-submit  text-[22px]" type="submit">Sign Up</button>
                <p className="p mt-[-5px] text-[18px]">
                    Already have an account?
                    <span className="span text-red-700 underline" onClick={() => { navigate("/login") }}>Sign In</span>
                </p>
            </form>
        </main>
    );
};

export default Register;
