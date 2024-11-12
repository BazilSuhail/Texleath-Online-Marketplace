import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../../redux/cartSlice';
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserCart = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/cartState/cart/${userId}`);
            //console.log('Fetch cart response:', response);
            if (response.status === 200) {
                dispatch(setCart(response.data.items));
            }
        } catch (error) {
            console.error('Error fetching cart state:', error);
        }
    };

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing JWT:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
            console.log('Login response:', response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
 
                const decodedToken = parseJwt(response.data.token);
                const userId = decodedToken?.id;  
                
                await fetchUserCart(userId);
                navigate('/profile');
                window.location.reload();
            } else {
                setError('Login failed: No token received');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <main className='flex xsx:pt-[150px] pt-[120px] min-h-screen flex-col  items-center justify-center'>
            <form onSubmit={handleSubmit} className="w-[100vw] sm:w-[520px] form ">
                <div className='text-red-800 text-[35px] text-center font-bold'>Welcome Back</div>
                <div className='text-red-800 text-[15px] text-center font-medium'>Please enter Email and Password</div>
                <div className='h-[3px] bg-red-200 w-[90%] mx-auto mb-[15px]'></div>
                {error && <div className='text-red-500 p-[5px] border-2 border-red-600 rounded-md'>Error: {error}</div>}
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
                    <input type="password" className="input" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your Password" />
                </div>

                <div>
                    <input type="checkbox" />
                    <label className='ml-[5px]'>Remember me </label>
                </div>
                <button className="button-submit  text-[22px]" type="submit">Sign In</button>
                <p className="p mt-[-5px] text-[18px]">
                    Don't have an account?
                    <span className="span text-red-700 underline" onClick={() => { navigate("/register") }}>Sign Up</span>
                </p>
            </form>
        </main>
    );
};

export default Login;
