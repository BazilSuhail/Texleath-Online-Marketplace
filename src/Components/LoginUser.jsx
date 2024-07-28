import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/cartSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cartState/cart/${userId}`);
            console.log('Fetch cart response:', response);
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
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            console.log('Login response:', response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                // Decode token to get user ID
                const decodedToken = parseJwt(response.data.token);
                const userId = decodedToken?.id; // Adjust this based on your token structure

                console.log('User ID:', userId);

                // Fetch and set the cart state
                await fetchUserCart(userId);

                navigate('/profile');
                window.location.reload(); // Refresh the whole website
            } else {
                setError('Login failed: No token received');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <main>
            {/*
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>*/}

            <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
                <div className='border-2 border-gray-600 rounded-[25px] p-[25px] h-[480px] md:h-[510px] w-[350px] md:w-[590px] flex flex-col'>
                    <h2 className='text-white bg-black rounded-md w-[100%] p-[8px] text-center text-3xl'>Signin</h2>
                    {error && <div>Error: {error}</div>}
                    <div className='flex items-center mt-[20px] justify-center'>

                        <p className='text-lg md:text-xl font-medium '>Dont Have An Account </p>
                        <p onClick={() => { navigate("/signup") }} className='cursor-pointer ml-[10px] underline font-bold text-2xl text-blue-800'>SignUP</p>

                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <p className='text-xl md:text-2xl font-semibold mt-[28px]'>Email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-lg border-2 border-gray-600 placeholder:text-gray-600 font-medium rounded-xl mt-[8px] p-[8px]'
                            placeholder="Enter Email"
                            required
                        />
                        <p className='text-xl md:text-2xl font-semibold mt-[5px]'>Password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-lg border-2 border-gray-600 placeholder:text-gray-600 font-medium rounded-xl mt-[8px] p-[8px]'
                            placeholder="Enter Password"
                            required
                        />
                        <button className='mt-[42px] bg-gray-800 shadow-custom-light text-[25px] md:text-[30px] rounded-[30px] text-white py-[8px]' type="submit">Signin</button>
                    </form>
                </div>
            </div>

        </main>
    );
};

export default Login;
