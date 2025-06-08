import { motion, AnimatePresence } from "framer-motion"
import { 
  AiOutlineSearch, 
  AiOutlineUser, 
  AiOutlineShoppingCart, 
  AiOutlineHeart, 
  AiOutlineMenu 
} from "react-icons/ai"
import {
  MdSports,
  MdFitnessCenter,
  MdDirectionsRun,
  MdSafetyDivider,
  MdAccessibility
} from 'react-icons/md';
import { 
  MdLaptop, 
  MdCheckroom, 
  MdHome, 
  MdAutoAwesome, 
  MdSportsBasketball, 
  MdMenuBook, 
  MdToys, 
  MdDiamond 
} from "react-icons/md"
import { useEffect, useState } from "react"
import SearchModal from "./SearchModal"
import texleathlogo from "../texleathlogo.svg"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCartLength } from "../redux/cartSlice"
import CartModal from "./CartModal";

export default function Navbar() {
    const cartLength = useSelector(selectCartLength);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [cartCount, setCartCount] = useState(3)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCartModal = () => setIsCartOpen(true);
  const closeCartModal = () => setIsCartOpen(false);

  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)


    
useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setIsLoggedIn(response.status === 200);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    fetchProfile();
}, []);


  const categories = [
      { name: "Fitness Wear", href: "#", icon: MdFitnessCenter },
    { name: "Sports Wear", href: "#", icon: MdSports },
    { name: "Gym Wear", href: "#", icon: MdDirectionsRun },
    { name: "Gloves", href: "#", icon: MdSafetyDivider },
    { name: "Safety Wear", href: "#", icon: MdSafetyDivider },
    { name: "Active Wear", href: "#", icon: MdAccessibility }
  ]

  const navItems = [ 
    { name: "About", href: "/about" },
    { name: "Catalog", href: "/productlist/All" },
    { name: "Categories", href: "#", hasDropdown: true }, 
  ]

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
          
            <NavLink to="/" className=" h-[55px] pt-[5px] lg:flex hidden items-center justify-center w-full pb-[5px] overflow-hidden">
                 <img src={texleathlogo} alt="Poor Connection" className="w-[45px] h-[45px]" />
                 <div className="flex flex-col"> 
            <div className="text-red-700 ml-[4px] text-[20px] font-bold">Texleath</div> 
                 </div>
             </NavLink>
          </motion.div>

          {/* Navigation Links - Hidden on smaller screens */}
          <div className="hidden md:flex items-center ml-[25px] space-x-4">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setHoveredCategory(true)}
                onMouseLeave={() => item.hasDropdown && setHoveredCategory(false)}
              >
              <NavLink to={item.href}>
                  <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -2 }}
                  className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 group-hover:w-full transition-all duration-300" />
                  {item.hasDropdown && <span className="ml-1 inline-block">▾</span>}
                </motion.div>
              </NavLink>

                {/* Categories Dropdown */}
                {item.name === "Categories" && (
                  <AnimatePresence>
                    {hoveredCategory && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-[350px] rounded-lg bg-white shadow-xl border border-gray-100 z-[999]"
                      >
                        <div className="p-3">
                          <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                            Browse Categories
                          </h3>
                          <div className="grid grid-cols-2 gap-1">
                            {categories.map((category) => {
                              const IconComponent = category.icon
                              return (
                                <motion.div
                                  key={category.name}
                                  href={category.href}
                                  whileHover={{
                                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    scale: 1.02,
                                  }}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:text-red-600 transition-colors duration-150"
                                >
                                  <IconComponent className="mr-2 p-[6px] text-[32px] text-red-700 bg-red-50 rounded-[6px]" />
                                  <span className="font-[600]">{category.name}</span>
                                </motion.div>
                              )
                            })}
                          </div>
                          <div className="mt-3 border-t border-gray-100">
                            <NavLink to="/productlist/All">
                            <motion.div 
                              whileHover={{ x: 5 }}
                              className="block px-3 py-2 text-[12px] underline underline-offset-2 font-medium text-red-600 hover:text-red-700"
                            >
                              View All Categories →
                            </motion.div>
                            </NavLink>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
          </div>

        <div className="flex">
          {/* Search Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center flex-1 w-[400px] mx-8"
          >
            <motion.button
              onClick={() => setIsSearchModalOpen(true)}
              whileHover={{ scale:  0.99}}
              className="w-full flex items-center px-4 py-2.5 border border-gray-200 rounded-full hover:shadow-sm transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <AiOutlineSearch className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-500">Search products ...</span>
            </motion.button>
          </motion.div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">

            {/* User Account */}
           <Link to="/profile">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden md:flex p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <AiOutlineUser className="w-6 h-6" />
            </motion.button>

           </Link>
            {/* Unique Cart Button */}  
            <motion.button
              onClick={openCartModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative bg-gradient-to-r from-red-700 via-red-900 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                <AiOutlineShoppingCart className="w-6 h-6" />
              </motion.div>

              {/* Cart Count Badge */}
              <AnimatePresence>
                {cartLength > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    key={cartLength}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <motion.span
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      {cartLength}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Effect Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-30"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button> 
            
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
        </div>
      </div>

     
      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={closeCartModal} />
    </motion.nav>
  )
}



// import React, { useState, useEffect, useCallback } from "react";
// import axios from 'axios';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// import { IoMenu, IoClose } from "react-icons/io5";
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from "framer-motion";
// import { selectCartLength } from "../redux/cartSlice";
// import { MdShoppingCart } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import texleathlogo from "../texleathlogo.svg";

// const Navbar = () => {
//     const cartLength = useSelector(selectCartLength);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
  

//     const [openIndex, setOpenIndex] = useState(null);
 
//     const [isScrollingUp, setIsScrollingUp] = useState(true);
//     const [prevScrollPos, setPrevScrollPos] = useState(0);
//     const [scrollPos, setScrollPos] = useState(0);
  
//     useEffect(() => {
//       const handleScroll = () => {
//         const currentScrollPos = window.scrollY;
//         setScrollPos(currentScrollPos);
  
//         if (currentScrollPos > prevScrollPos) {
//           setIsScrollingUp(false); // Hides navbar on scroll down
//         } else {
//           setIsScrollingUp(true);  // Shows navbar on scroll up
//         }
  
//         setPrevScrollPos(currentScrollPos);
//       };
  
//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//     }, [prevScrollPos]);
  
//     const getNavbarPosition = () => {
//       if (scrollPos === 0) return 0;           // Fully visible at top of page
//       if (isScrollingUp) return -35;            // Partially visible when scrolling up
//       return -150;                             // Hidden on scroll down
//     };

//     const handleToggle = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };
 
    
//     const fetchProfile = useCallback(async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 if (response.status === 200) {
//                     setIsLoggedIn(true);
//                 } else {
//                     setIsLoggedIn(false);
//                 }
//             } else {
//                 setIsLoggedIn(false);
//             }
//         } catch (error) {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchProfile();
//     }, [fetchProfile]);

//     const handleMenuToggle = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };
   
//     const texts = ["HURRY UP SHOW NOW !!", "FREE DELIVERY ON USD 200 AND ABOVE IN USA", "Buy Any 3 Products and Get "];
//     const [index, setIndex] = useState(0);

    
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((prevIndex) => (prevIndex + 1) % texts.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     });

//     return (
//         <motion.nav
//         className="fixed top-0 w-full bg-gradient-to-r from-red-950 via-custom-red to-red-950 z-50"
//         initial={{ y: 0 }}
//         animate={{ y: getNavbarPosition() }}
//         transition={{ duration: 0.3 }}
//       > 
//             <div className="h-[30px] pb-[5px] z-[999] relative bg-gradient-to-r from-red-950 via-custom-red to-red-950  overflow-hidden">
//                 <AnimatePresence>
//                     {texts.map((text, i) => (
//                         i === index && (
//                             <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, y: 50 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -50 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="text-[15px] text-center mt-[5px] text-white font-normal"
//                             >
//                                 {text}
//                             </motion.div>
//                         )
//                     ))}
//                 </AnimatePresence>
//             </div>

//             <div className=" z-50 relative">
//                 {!isMenuOpen ?
//                     <motion.div
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -50 }}
//                         transition={{ duration: 1 }}
//                         className="h-[2px] my-[4px] bg-red-950 w-full"></motion.div>
//                     : <div className="h-[10px] bg-gradient-to-r from-red-950 via-custom-red to-red-950 w-full"></div>
//                 }
//             </div>


//             <NavLink to="/" className=" h-[55px] pt-[5px] lg:flex hidden items-center justify-center w-full pb-[5px] overflow-hidden">
//                 <img src={texleathlogo} alt="kasm kjanf" className="w-[45px] h-[45px]" />
//                 <div className="text-red-700 ml-[4px] text-[30px] font-bold">TEXLEATH</div>
//                 <div className="text-red-100 ml-[5px] text-[30px] font-bold">INDUSTRIES</div>
//             </NavLink>

//             <div className="w-full lg:flex hidden h-[55px] pt-[8px]  p-4 items-center justify-between z-50">
//                 <div>
//                     <NavLink to="/about" className="text-gray-200  font-semibold cursor-pointer relative border-none bg-transparent transition-all duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:text-white hover:text-white after:content-[''] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:after:w-full focus:after:left-0 hover:after:w-full hover:after:left-0 mt-[10px]" >
//                         About
//                     </NavLink>
//                     <NavLink to="/productlist/All" className="text-red-200 ml-[12px] font-bold cursor-pointer relative border-none bg-transparent transition-all duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:text-white hover:text-white after:content-[''] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:after:w-full focus:after:left-0 hover:after:w-full hover:after:left-0 mt-[10px]" >
//                         Catalog
//                     </NavLink>
//                 </div>

//                 <div className="flex items-center space-x-8 ml-[-25px] font-medium text-white">
//                     <NavLink to="/productlist/Sports%20Wear" className="text-gray-200  font-semibold cursor-pointer relative border-none bg-transparent transition-all duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:text-white hover:text-white after:content-[''] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:after:w-full focus:after:left-0 hover:after:w-full hover:after:left-0 mt-[10px]">
//                         Sports
//                     </NavLink>

//                     <NavLink to="/productlist/Active%20Wear" className="text-gray-200  font-semibold cursor-pointer relative border-none bg-transparent transition-all duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:text-white hover:text-white after:content-[''] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:after:w-full focus:after:left-0 hover:after:w-full hover:after:left-0 mt-[10px]">
//                         Active Wear
//                     </NavLink>

//                     <NavLink to="/productlist/Fitness%20Wear" className="text-gray-200  font-semibold cursor-pointer relative border-none bg-transparent transition-all duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:text-white hover:text-white after:content-[''] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] focus:after:w-full focus:after:left-0 hover:after:w-full hover:after:left-0 mt-[10px]">
//                         Gym Wear
//                     </NavLink>
//                 </div>

//                 {isLoggedIn ? (
//                     <div className="flex">
//                         <NavLink to="/cart"><MdShoppingCart className="text-red-200 hover:scale-110 hover:text-red-500 mt-[8px] text-[32px]" /></NavLink>
//                         <p className=" text-md w-[23px] h-[23px] bg-white text-red-700 rounded-full text-center font-extrabold mr-[5px]">{cartLength}</p>
//                         <NavLink to="/profile"><IoPersonCircleOutline className="text-white hover:text-red-600 text-[45px]" /></NavLink>
//                     </div>
//                 ) : (
//                     <NavLink to="/login" className="text-[17px] w-[140px] xl:ml-[-65px] py-[3px] text-center z-30  bg-rose-950 border border-white rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-500 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 ">
//                         Start Shpping
//                     </NavLink>

//                 )}
//             </div>


//             <div className="relative text-white lg:hidden">
//                 <div className="flex z-[999] items-center h-[70px] justify-between bg-gradient-to-r from-red-950 via-custom-red to-red-950 px-4 py-3 relative">
//                     <div className="flex items-center">
//                         <motion.div
//                             initial={{ opacity: 1 }}
//                             animate={{ opacity: isMenuOpen ? 0 : 1 }}
//                             transition={{ duration: 0.2 }} // Adjust duration as needed
//                         >
//                             <img src={texleathlogo} alt="TL" className="md:w-[45px] w-[33px] h-[33px] md:h-[45px]" />
//                         </motion.div>
//                         <motion.div
//                             className="text-[28px] font-bold"
//                             initial={{ x: 40 }}
//                             animate={{ x: isMenuOpen ? -40 : 0 }}
//                             transition={{ duration: 0.5 }} // Adjust duration as needed
//                         >
//                             <div className="flex">
//                                 <div className="text-red-700 ml-[4px] md:text-[25px] text-[19px] font-bold">TEXLEATH</div>
//                                 <div className="text-red-100 ml-[5px] md:text-[25px] text-[18px] font-bold">INDUSTRIES</div>
//                             </div>
//                         </motion.div>
//                     </div>
//                     <div className="flex">
//                         {isLoggedIn &&
//                             <>
//                                 <NavLink to="/cart"><MdShoppingCart className="text-white hover:scale-110 hover:text-red-500 mt-[5px] text-[28px]" /></NavLink>
//                                 <p className=" text-md w-[23px] h-[23px] bg-white text-red-700 rounded-full text-center font-extrabold mr-[5px]">{cartLength}</p>
//                             </>
//                         }
//                         <motion.div
//                             key={isMenuOpen ? 'close' : 'menu'} 
//                             initial={{ opacity: 0, rotate: isMenuOpen ? 180 : -180 }}
//                             animate={{ opacity: 1, rotate: 0 }}
//                             exit={{ opacity: 0, rotate: isMenuOpen ? -180 : 180 }} 
//                             transition={{ duration: 0.3 }}
//                             className="cursor-pointer text-gray-300"
//                             onClick={handleMenuToggle}
//                         >
//                             {isMenuOpen ? (
//                                 <IoClose size={35} />
//                             ) : (
//                                 <IoMenu size={35} />
//                             )}
//                         </motion.div>
//                     </div>
//                 </div>

//                 {/* Full navbar for smaller screens */}
//                 <AnimatePresence>
//                     {isMenuOpen && (
//                         <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: "100vw", transition: { duration: 0.5 } }}
//                             exit={{ width: 0, transition: { duration: 0.3, delay: 0.1 } }}
//                             className="fixed mt-[65px] pb[45px] inset-0 bg-gradient-to-r from-red-950 via-custom-red to-red-950 flex w-[100vw] flex-col h-screen px-4 py-3"
//                         >
//                             <div className='my-[10px]'></div>
//                             {/* Menu items */}
//                             <motion.div
//                                 initial={{ x: -100, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
//                                 exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
//                                 className="flex flex-col mt-[50px]"
//                             >
//                                 <NavLink to="/" onClick={handleMenuToggle} className="text-white mb-[12px] text-md text-xl  mr-[15px]"> Home</NavLink>
//                                 <NavLink to="/productlist/All" onClick={handleMenuToggle} className="text-white  mb-[12px] text-md text-lg mr-[15px]"> Catalog</NavLink>

//                                 <div key={index} className='mb-4'>
//                                     <button
//                                         className="text-white text-md text-xl flex items-center w-full justify-between mr-[15px]"
//                                         onClick={() => handleToggle(index)}
//                                         type='button'
//                                     >
//                                         <span>Categories</span>
//                                         <motion.div
//                                             initial={{ rotate: 0 }}
//                                             animate={{ rotate: openIndex === index ? 360 : 0 }}
//                                             transition={{ duration: 0.5 }}
//                                             className='text-red-50 text-xl mt'
//                                         >
//                                             {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
//                                         </motion.div>
//                                     </button>
//                                     <AnimatePresence>
//                                         {openIndex === index && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, height: 0 }}
//                                                 animate={{ opacity: 1, height: 'auto' }}
//                                                 exit={{ opacity: 0, height: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className='mt-2 text-white flex flex-col my-[15px] space-y-3 px-4'
//                                             >
//                                                 <div className="w-[50%] bg-red-100 h-[2px] rounded-2xl mt-[8px]"></div>
//                                                 <NavLink onClick={handleMenuToggle} to="/productlist/Active%20Wear">Active Wear</NavLink>
//                                                 <NavLink onClick={handleMenuToggle} to="/productlist/Sports%20Wear">Sports Wear</NavLink>
//                                                 <NavLink onClick={handleMenuToggle} to="/productlist/Fitness%20Wear">Fitness Wear</NavLink>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                                 <div className="h-[2px] w-[85%] bg-red-50 mt-[-5px]"></div>

//                                 <NavLink to="/about" onClick={handleMenuToggle} className="text-white text-md mt-[15px] text-lg mr-[15px]"> About Us</NavLink>
//                                 <div className="my-[5px] "></div>
//                                 <NavLink to="/faqs" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]"> FAQ's</NavLink>
//                                 <div className="my-[5px] "></div>
//                                 <NavLink to="/customerSupport" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Customer Support</NavLink>
//                                 <div className="my-[5px] "></div>
//                                 <NavLink to="/privacyPolicy" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Privacy Policy</NavLink>
//                                 <div className="my-[5px] "></div>
//                                 <NavLink to="/termsOfService" onClick={handleMenuToggle} className="text-white text-md text-lg mr-[15px]">Terms Of Service</NavLink>
//                                 <div className="my-[5px] "></div>

//                                 <div className="h-[2px] w-[85%] bg-red-50  my-[8px]"></div>

//                                 {isLoggedIn ? (
//                                     <div className="flex">
//                                         <NavLink onClick={handleMenuToggle} to="/profile" className="flex items-center mt-[7px]"><IoPersonCircleOutline className="text-red-100 hover:text-red-600 text-[45px]" /><span className="font-medium underline ml-[2px] text-xl text-white">My Profile</span></NavLink>
//                                     </div>
//                                 ) : (
//                                     <NavLink to="/login" onClick={handleMenuToggle} className="text-white mt-[15px] text-md w-[130px] text-center py-[3px] hover:bg-red-950 bg-red-900 border border-white px-[8px] rounded-lg mr-[15px]">
//                                         Start Shopping
//                                     </NavLink>
//                                 )}

//                                 {/*                           
//                                 <NavLink to="/login" className="text-white text-md text- mr-[15px]">Login</NavLink>
//                                 <NavLink to="/register" className="text-white text-md text-lg mr-[15px]">Register</NavLink>
//                                 <NavLink to="/profile" className="text-white text-md text-lg mr-[15px]">Profile</NavLink> 
//                                 */}

//                             </motion.div>


//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//         </motion.nav>
//     );
// };

// export default Navbar;
