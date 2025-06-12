import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const SignIn = () => {
    const [email, setEmail] = useState('bazil1854@gmail.com');
    const [password, setPassword] = useState('112233');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserCart = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/cartState/cart/${userId}`);
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
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                const decodedToken = parseJwt(response.data.token);
                const userId = decodedToken?.id;

                await fetchUserCart(userId);
                navigate('/profile');
                window.location.reload();
            } else {
                setError('SignIn failed: No token received');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'SignIn failed');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <main className='flex min-h-[90vh] items-center justify-center bg-gray-50'>
            <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-lg px-8 sm:px-12 py-8 space-y-6 bg-white border-[2px] border-gray-100 rounded-xl shadow-md">
                <div className="space-y-2 text-center">
                    <h1 className='text-3xl font-bold text-red-600'>Welcome Back</h1>
                    <p className='text-gray-600'>Please enter your email and password</p>
                    <div className='h-1 bg-red-100 w-3/4 mx-auto'></div>
                </div>

                {error && (
                    <div className='p-2 text-red-600 bg-red-50 border border-red-200 rounded-md'>
                        Error: {error}
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

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label className='ml-2 text-sm text-gray-600'>Remember me</label>
                    </div>

                    <button
                        className="w-full px-4 py-2 text-lg font-medium text-white bg-red-700 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                        type="submit"
                        disabled={isLoading} // Disable button during loading
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <p className="text-center text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="font-medium text-red-600 hover:text-red-700 hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </form>
        </main>
    );
};

export default SignIn;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setCart } from '../redux/cartSlice';
// import { IoLockClosedOutline } from "react-icons/io5";
// import { IoMail } from "react-icons/io5";

// const SignIn = () => {
//     const [email, setEmail] = useState('bazil1854@gmail.com');
//     const [password, setPassword] = useState('112233');
//     const [error, setError] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const fetchUserCart = async (userId) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/cartState/cart/${userId}`);
//             //console.log('Fetch cart response:', response);
//             if (response.status === 200) {
//                 dispatch(setCart(response.data.items));
//             }
//         } catch (error) {
//             console.error('Error fetching cart state:', error);
//         }
//     };

//     const parseJwt = (token) => {
//         try {
//             const base64Url = token.split('.')[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const jsonPayload = decodeURIComponent(
//                 atob(base64)
//                     .split('')
//                     .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//                     .join('')
//             );
//             return JSON.parse(jsonPayload);
//         } catch (error) {
//             console.error('Error parsing JWT:', error);
//             return null;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/login`, { email, password });
//             console.log('SignIn response:', response);
//             if (response.data.token) {
//                 localStorage.setItem('token', response.data.token);

//                 const decodedToken = parseJwt(response.data.token);
//                 const userId = decodedToken?.id;

//                 await fetchUserCart(userId);
//                 navigate('/profile');
//                 window.location.reload();
//             } else {
//                 setError('SignIn failed: No token received');
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'SignIn failed');
//         }
//     };



//     return (
//         <main className='flex min-h-[90vh] items-center justify-center bg-gray-50'>
//             <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-lg px-8 sm:px-12 py-8 space-y-6 bg-white border-[2px] border-gray-100 rounded-xl shadow-md">
//                 <div className="space-y-2 text-center">
//                     <h1 className='text-3xl font-bold text-red-600'>Welcome Back</h1>
//                     <p className='text-gray-600'>Please enter your email and password</p>
//                     <div className='h-1 bg-red-100 w-3/4 mx-auto'></div>
//                 </div>

//                 {error && (
//                     <div className='p-2 text-red-600 bg-red-50 border border-red-200 rounded-md'>
//                         Error: {error}
//                     </div>
//                 )}

//                 <div className="space-y-6">
//                     <div className="space-y-2">
//                         <label className='text-sm font-medium text-gray-700'>Email</label>
//                         <div className="flex items-center px-3 mt-2 py-2 border-[2px] rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500">
//                             <IoMail className='text-red-700' size={20} />
//                             <input
//                                 type="email"
//                                 className="w-full ml-2 outline-none"
//                                 required
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <label className='text-sm font-medium text-gray-700'>Password</label>
//                         <div className="flex items-center px-3 mt-2 py-2 border-[2px] rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500">
//                             <IoLockClosedOutline className='text-red-600' size={20} />
//                             <input
//                                 type="password"
//                                 className="w-full ml-2 outline-none"
//                                 required
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Enter your password"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
//                         />
//                         <label className='ml-2 text-sm text-gray-600'>Remember me</label>
//                     </div>

//                     <button
//                         className="w-full px-4 py-2 text-lg font-medium text-white bg-red-700 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                         type="submit"
//                     >
//                         Sign In
//                     </button>

//                     <p className="text-center text-gray-600">
//                         Don't have an account?{' '}
//                         <button
//                             type="button"
//                             onClick={() => navigate("/signup")}
//                             className="font-medium text-red-600 hover:text-red-700 hover:underline"
//                         >
//                             Sign Up
//                         </button>
//                     </p>
//                 </div>
//             </form>
//         </main>
//     );
// };

// export default SignIn;
