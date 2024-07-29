import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

import { IoMenu, IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { selectCartLength } from "../redux/cartSlice";
import { MdShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import texleathlogo from "../texleathlogo.svg";
const Navbar = () => {

    const cartLength = useSelector(selectCartLength);
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


    // Text Fade animation  
    const texts = ["HURRY UP SHOW NOW !!", "FREE DELIVERY ON USD 200 AND ABOVE IN USA", "Buy Any 3 Products and Get "];
    const [index, setIndex] = useState(0);

    // Change text index every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000); // Change text every 2 seconds

        return () => clearInterval(interval);
    });

    return (
        <nav className="bg-gradient-to-r from-red-950 via-custom-red to-red-950 ">
            {/* Navbar for larger screens */}

            <div className="h-[30px] pb-[5px] z-50 relative bg-gradient-to-r from-red-950 via-custom-red to-red-950  overflow-hidden">
                <AnimatePresence>
                    {texts.map((text, i) => (
                        i === index && (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="text-[15px] text-center mt-[5px] text-white font-normal"
                            >
                                {text}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            <div className=" z-50 relative">
                {!isMenuOpen ?
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 1 }}
                        className="h-[2px] my-[4px] bg-red-950 w-full"></motion.div>
                    : <div className="h-[10px] bg-gradient-to-r from-red-950 via-custom-red to-red-950 w-full"></div>
                }
            </div>

            <NavLink to="/" className="h-[55px] pt-[5px] xsx:flex hidden items-center justify-center w-full pb-[5px] overflow-hidden">
                <img src={texleathlogo} alt="kasm kjanf" className="w-[45px] h-[45px]" />
                <div className="text-red-700 ml-[4px] text-[30px] font-bold">TEXLEATH</div>
                <div className="text-red-100 ml-[5px] text-[30px] font-bold">INDUSTRIES</div>
            </NavLink>

            <div className="w-full xsx:flex hidden h-[55px] pt-[8px]  p-4 items-center justify-between z-50">
                <div>
                    <NavLink to="/avout" className="text-white font-serif ml-[15px]"> About</NavLink>
                    <NavLink to="/productlist/All" className="text-white font-serif ml-[12px]"> Catalog</NavLink>
                </div>

                <div className="flex items-center space-x-8 ml-[-25px] font-medium text-white">
      <NavLink
        to="/productlist/Sports%20Wear"
        className="relative group"
      >
        Sports Wear
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-white"
          initial={{ width: '0%', left: '50%' }}
          whileHover={{ width: '100%', left: '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </NavLink>
      <NavLink
        to="/productlist/Active%20Wear"
        className="relative group"
      >
        Active Wear
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-white"
          initial={{ width: '0%', left: '50%' }}
          whileHover={{ width: '100%', left: '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </NavLink>
      <NavLink
        to="/productlist/Fitness%20Wear"
        className="relative group"
      >
        Gym Wear
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-white"
          initial={{ width: '0%', left: '50%' }}
          whileHover={{ width: '100%', left: '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </NavLink>
    </div>

                {isLoggedIn ? (
                    <div className="flex">
                        <NavLink to="/cart"><MdShoppingCart className="text-red-200 hover:scale-110 hover:text-red-500 mt-[8px] text-[32px]" /></NavLink>
                        <p className="text-white text-lg font-bold mr-[5px]">{cartLength}</p>
                        <NavLink to="/profile"><IoPersonCircleOutline className="text-white hover:text-red-600 text-[45px]" /></NavLink>
                    </div>
                ) : (
                    <NavLink to="/login" className="text-white text-lg hover:bg-red-950 shadow-custom-shadow bg-red-700  border-white px-[8px] rounded-lg mr-[15px]">
                        Start Shopping
                    </NavLink>
                )}

            </div>


            <div className="relative  text-white xsx:hidden">
                <div className="flex items-center h-[70px] justify-between bg-gradient-to-r from-red-950 via-custom-red to-red-950 px-4 py-3 z-50 relative">
                    <div className="flex items-center">
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isMenuOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }} // Adjust duration as needed
                        >
                            <img src={texleathlogo} alt="TL" className="md:w-[45px] w-[33px] h-[33px] md:h-[45px]" />
                        </motion.div>
                        <motion.div
                            className="text-[28px] font-bold"
                            initial={{ x: 40 }}
                            animate={{ x: isMenuOpen ? -40 : 0 }}
                            transition={{ duration: 0.5 }} // Adjust duration as needed
                        >
                            <div className="flex">
                                <div className="text-red-700 ml-[4px] md:text-[25px] text-[19px] font-bold">TEXLEATH</div>
                                <div className="text-red-100 ml-[5px] md:text-[25px] text-[18px] font-bold">INDUSTRIES</div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex">
                        <NavLink onClick={handleMenuToggle} to="/cart"><MdShoppingCart className="text-white hover:scale-110 hover:text-red-500 mt-[5px] text-[28px]" /></NavLink>
                        <p className="text-white text-md mb-[4px] font-bold mr-[5px]">{cartLength}</p>
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
                            className="fixed inset-0 bg-navbar-color bg-gradient-to-r from-red-950 to-custom-red flex w-[70vw] flex-col h-screen px-4 py-3 z-30"
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
