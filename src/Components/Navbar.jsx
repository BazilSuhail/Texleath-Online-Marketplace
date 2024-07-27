import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {

    const linkStyles = "text-md ml-[15px] my-[8px] border-black border-2 hover:border-white px-[8px] py-[5px] flex items-center font-medium rounded-xl";
    const activeLinkStyles = "bg-white text-black";

    return (
        <nav>
            {/* Navbar for larger screens */}
            <div className="w-full h-[80px] p-4 bg-black flex items-center justify-between z-50">
                <div className="flex justify-between w-full items-center">

                    <div className="xsx:flex hidden text-md items-center text-white">
                        <NavLink to="/" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}> Home</NavLink>
                        <NavLink to="/productlist" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}> List</NavLink>
                 
                        <NavLink to="/cart" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}>Cart</NavLink>
                        <NavLink to="/orders-tracking" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}>Cart</NavLink>

                        <NavLink to="/login" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}>Register</NavLink>
                        <NavLink to="/profile" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ""}`}>Profile</NavLink>
                    </div>

                </div>
            </div>

        </nav>
    );
};

export default Navbar;
