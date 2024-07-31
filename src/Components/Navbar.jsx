import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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


    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
            

            <NavLink to="/" className=" h-[55px] pt-[5px] xsx:flex hidden items-center justify-center w-full pb-[5px] overflow-hidden">
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

                    <NavLink to="/productlist/Sports%20Wear" className="relative group">
                        Sports  
                    </NavLink>

                    <NavLink to="/productlist/Active%20Wear" className="relative group">
                        Active Wear 
                    </NavLink>

                    <NavLink to="/productlist/Fitness%20Wear" className="relative group">
                        Gym Wear 
                    </NavLink>
                </div>

                {isLoggedIn ? (
                    <div className="flex">
                        <NavLink to="/cart"><MdShoppingCart className="text-red-200 hover:scale-110 hover:text-red-500 mt-[8px] text-[32px]" /></NavLink>
                        <p className=" text-md w-[23px] h-[23px] bg-white text-red-700 rounded-full text-center font-extrabold mr-[5px]">{cartLength}</p>
                        <NavLink to="/profile"><IoPersonCircleOutline className="text-white hover:text-red-600 text-[45px]" /></NavLink>
                    </div>
                ) : (
                    <NavLink to="/login" className="text-white mt-[15px] text-[17px] w-[140px] xl:ml-[-65px] text-center py-[3px] hover:bg-red-950 bg-red-900 border border-white px-[8px] rounded-lg mr-[15px]">
                        Start Shopping
                    </NavLink>
                )}

            </div>


            <div className="relative text-white xsx:hidden">
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
                        <NavLink to="/cart"><MdShoppingCart className="text-white hover:scale-110 hover:text-red-500 mt-[5px] text-[28px]" /></NavLink>

                        <p className=" text-md w-[23px] h-[23px] bg-white text-red-700 rounded-full text-center font-extrabold mr-[5px]">{cartLength}</p>
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

                        >
                            <div className='my-[25px]'></div>
                            {/* Menu items */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                                exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                                className="flex flex-col mt-[50px]"
                            >
                                <NavLink to="/" onClick={handleMenuToggle} className="text-white mb-[12px] text-md text-xl  mr-[15px]"> Home</NavLink>
                               
                                <NavLink to="/productlist/All" onClick={handleMenuToggle} className="text-white  mb-[12px] text-md text-lg mr-[15px]"> Catalog</NavLink>
                               
                                <div key={index} className='mb-4'>
                                    <button
                                        className="text-white text-md text-xl flex items-center w-full justify-between mr-[15px]"
                                        onClick={() => handleToggle(index)}
                                        type='button'
                                    >
                                        <span>Categories</span>
                                        <motion.div
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: openIndex === index ? 360 : 0 }}
                                            transition={{ duration: 0.5 }}
                                            className='text-red-50 text-xl mt'
                                        >
                                            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className='mt-2 text-white flex flex-col my-[15px] space-y-3 px-4'
                                            >
                                                <div className="w-[50%] bg-red-100 h-[2px] rounded-2xl mt-[8px]"></div>
                                                <NavLink onClick={handleMenuToggle} to="/productlist/Active%20Wear">Active Wear</NavLink>
                                                <NavLink onClick={handleMenuToggle} to="/productlist/Sports%20Wear">Sports Wear</NavLink>
                                                <NavLink onClick={handleMenuToggle} to="/productlist/Fitness%20Wear">Fitness Wear</NavLink>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="h-[2px] w-[85%] bg-red-50 mt-[-5px]"></div>

                                <NavLink to="/productlist" onClick={handleMenuToggle} className="text-white text-md mt-[15px] text-lg mr-[15px]"> About Us</NavLink>
                                <div className="my-[5px] "></div>
                                <NavLink to="/productlist" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]"> FAQ's</NavLink>
                                <div className="my-[5px] "></div>
                                <NavLink to="/productlist" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Privacy Policy</NavLink>
                                <div className="my-[5px] "></div>
                                <NavLink to="/productlist" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Terms Of Service</NavLink>
                                <div className="my-[5px] "></div>
                                <NavLink to="/productlist" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Customer Support</NavLink>
                                <div className="my-[5px] "></div>
                               
                                <div className="h-[2px] w-[85%] bg-red-50  my-[8px]"></div>

                                {isLoggedIn ? (
                                    <div  className="flex">
                                         <NavLink onClick={handleMenuToggle}  to="/profile" className="flex items-center mt-[7px]"><IoPersonCircleOutline className="text-red-100 hover:text-red-600 text-[45px]" /><span className="font-medium underline ml-[2px] text-xl text-white">My Profile</span></NavLink>
                                    </div>
                                ) : (
                                    <NavLink to="/login" onClick={handleMenuToggle} className="text-white mt-[15px] text-md w-[130px] text-center py-[3px] hover:bg-red-950 bg-red-900 border border-white px-[8px] rounded-lg mr-[15px]">
                                        Start Shopping
                                    </NavLink>
                                )}

                                {/*                           
                                <NavLink to="/login" className="text-white text-md text- mr-[15px]">Login</NavLink>
                                <NavLink to="/register" className="text-white text-md text-lg mr-[15px]">Register</NavLink>
                                <NavLink to="/profile" className="text-white text-md text-lg mr-[15px]">Profile</NavLink> 
                                */}

                            </motion.div>


                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </nav>
    );
};

export default Navbar;
