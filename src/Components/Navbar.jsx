import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Use useCallback to memoize the fetchProfile function
    const fetchProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('http://localhost:3001/api/auth/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            {/* Navbar for larger screens */}
            <div className="w-full xsx:flex hidden h-[80px] bg-gradient-to-r from-red-950 via-black to-red-950  p-4 items-center justify-between z-50">
                <div className="flex w-full items-center">

                    <NavLink to="/" className="text-white text-md text-lg mr-[15px]"> Home</NavLink>
                    <NavLink to="/productlist" className="text-white text-md text-lg mr-[15px]">About</NavLink>
                    <NavLink to="/productlist" className="text-white text-md text-lg mr-[15px]"> Catalog</NavLink>
                    <NavLink to="/productlist" className="text-white text-md text-lg mr-[15px]"> Categories</NavLink>

                    {isLoggedIn && <>

                        <NavLink to="/cart" className="text-white text-md text-lg mr-[15px]">Cart</NavLink>
                        <NavLink to="/profile" className="text-white text-md text-lg mr-[15px]">Profile</NavLink>
                    </>}

                    {!isLoggedIn && <>
                        
                    <NavLink to="/login" className="text-white text-md text- mr-[15px]">Login</NavLink>
                    </>}


                </div>
            </div>


            <div className="relative  text-white md:hidden">
                <div className="flex  items-center h-[70px] justify-between bg-gradient-to-r from-red-950 via-black to-red-950 px-4 py-3 z-50 relative">
                    <div className="flex items-center">
                        <motion.div
                            className="bg-gray-500 mr-[12px]"
                            style={{ width: '35px', height: '35px' }}
                            initial={{ y: 1, opacity: 1 }}
                            animate={{ y: isMenuOpen ? -100 : 1, opacity: isMenuOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }} // Adjust duration as needed
                        />
                        <motion.div
                            className="text-[28px] font-bold"
                            initial={{ x: 40 }}
                            animate={{ x: isMenuOpen ? -40 : 0 }}
                            transition={{ duration: 0.5 }} // Adjust duration as needed
                        >
                            ABOUT
                        </motion.div>
                    </div>
                    <div className="md:hidden">
                        <motion.div
                            key={isMenuOpen ? 'close' : 'menu'} // Unique key to trigger animation on change
                            initial={{ opacity: 0, rotate: isMenuOpen ? 180 : -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: isMenuOpen ? -180 : 180 }} // Animate out with reverse rotation
                            transition={{ duration: 0.3 }} // Duration for the animation
                            className="cursor-pointer text-gray-300"
                            onClick={handleMenuToggle}
                        >
                            {isMenuOpen ? (
                                <IoClose size={35} />
                            ) : (
                                <IoMenu size={35} />
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Full navbar for smaller screens */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70vw", transition: { duration: 0.5 } }}
                            exit={{ width: 0, transition: { duration: 0.3, delay: 0.3 } }}
                            className="fixed inset-0 bg-navbar-color bg-gradient-to-r from-red-950 to-black flex w-[70vw] flex-col h-screen px-4 py-3 z-30"
                            onClick={handleMenuToggle}
                        >
                            <div className='my-[25px]'></div>
                            {/* Menu items */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                                exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                                className="flex flex-col mt-10"
                                onClick={handleMenuToggle}
                            >

                                <NavLink to="/" className="text-white text-md text-lg mr-[15px]"> Home</NavLink>
                                <NavLink to="/productlist" className="text-white text-md text-lg mr-[15px]"> List</NavLink>
                                <NavLink to="/cart" className="text-white text-md text-lg mr-[15px]">Cart</NavLink>
                                <NavLink to="/orders-tracking" className="text-white text-md text-lg mr-[15px]">Orders</NavLink>
                                <NavLink to="/login" className="text-white text-md text- mr-[15px]">Login</NavLink>
                                <NavLink to="/register" className="text-white text-md text-lg mr-[15px]">Register</NavLink>
                                <NavLink to="/profile" className="text-white text-md text-lg mr-[15px]">Profile</NavLink>

                            </motion.div>


                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </nav>
    );
};

export default Navbar;
