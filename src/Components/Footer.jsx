import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-gradient-to-r from-red-950 via-custom-red to-red-950 pt-[45px] text-white'>
            <div className='mx-auto px-6'>
                <div className='flex flex-wrap justify-between'>
                    {/* Company Information */}
                    <div className='w-full md:w-1/4 mb-6'>
                        <h2 className='text-2xl font-bold mb-4'>Texleath Industries</h2>
                        <p className='mb-2'>Your trusted partner in clothing and manufacturing.</p>
                        <p className='mb-2'>Reiman Road, Sialkot, Pakistan</p>
                        <p className='mb-2'>Phone: +92 1111111111</p>
                        <p>Email: <a href='managment@textleathindustries.com' className='underline'>info@yourcompany.com</a></p>
                    </div>

                    {/* Quick Links */}
                    <div className='w-full md:w-1/4 mb-6'>
                        <h3 className='lg:ml-[55px] text-xl font-semibold mb-4'>Quick Links</h3>
                        <ul className='lg:ml-[55px]'>
                            <li><Link to='/about' className='hover:underline'>About Us</Link></li>
                            <li><Link to='/contact' className='hover:underline'>Contact</Link></li>
                            <li><Link to='/faqs' className='hover:underline'>FAQ's</Link></li>
                            <li><Link to='/privacyPolicy' className='hover:underline'>Privacy Policy</Link></li>
                            <li><Link to='/terms-of-service' className='hover:underline'>Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className='w-full md:w-1/4 mb-6'>
                        <h3 className='text-xl font-semibold mb-4'>Newsletter</h3>
                        <p className='mb-4'>Subscribe to our newsletter for the latest updates and offers.</p>
                        <form className='flex'>
                            <input type='email' placeholder='Your email' className='flex-grow pl-[10px] py-[4px] rounded-l-md border border-gray-600' />
                            <button type='submit' className='bg-red-800 px-4 py-[4px] rounded-r-md border border-red-700'>Subscribe</button>
                        </form>
                    </div>

                    {/* Social Media Links */}
                    <div className='w-full md:w-1/4 mb-6'>
                        <h3 className='lg:ml-[45px] text-xl font-semibold mb-4'>Follow Us</h3>
                        <div className='flex lg:ml-[40px] space-x-4'>
                            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                                <FaFacebookF className='text-4xl border-2 border-red-100 rounded-md p-[5px] hover:text-red-400' />
                            </a>
                            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                                <FaTwitter className='text-4xl border-2 border-red-100 rounded-md p-[5px] hover:text-red-400' />
                            </a>
                            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                                <FaInstagram className='text-4xl border-2 border-red-100 rounded-md p-[5px] hover:text-red-400' />
                            </a>
                            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
                                <FaLinkedinIn className='text-4xl border-2 border-red-100 rounded-md p-[5px] hover:text-red-400' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-red-200 h-[2px] w-[90vw] mx-auto mt-[25px] rounded-2xl'></div>
            <div className=' font-semibold py-4'>
                <div className=' mx-auto text-center'>
                    <p className='text-red-200'>&copy; {new Date().getFullYear()} TexLeath Industries. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
