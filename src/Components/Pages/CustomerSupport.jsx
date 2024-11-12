import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const detailVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

const CustomerSupport = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
 
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission logic
    setStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='bg-gray-100  xsx:pt-[150px] pt-[120px]  min-h-screen pb-8 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8'>
        <motion.h1
          className='text-3xl md:text-4xl font-bold underline underline-offset-8 mb-6 md:mb-8 text-red-700 text-center'
          variants={headingVariants}
          initial='hidden'
          animate='visible'
        >
          Customer Support
        </motion.h1>
        
        <motion.p
          className='text-base md:text-lg text-gray-700 mb-6 md:mb-8'
          variants={textVariants}
          initial='hidden'
          animate='visible'
        >
          At Texleath Industries, we are dedicated to providing exceptional customer support to ensure your complete satisfaction. Whether you have questions about our products, need assistance with an order, or have any concerns, our knowledgeable and friendly team is here to help. We value your feedback and are committed to resolving any issues promptly and efficiently. Please feel free to reach out to us through any of the contact methods below.
        </motion.p>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8'
          variants={textVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='flex flex-col items-center p-4 md:p-6 bg-red-50 border border-red-200 rounded-lg shadow-md'
            variants={detailVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.2 }}
          >
            <FaPhoneAlt className='text-3xl md:text-4xl text-red-600 mb-3 md:mb-4' />
            <h2 className='text-lg md:text-xl font-semibold text-red-800 mb-2'>Phone</h2>
            <p className='text-red-700 text-center font-medium text-sm md:text-base'>+92 (000) 000-000</p>
          </motion.div>

          <motion.div
            className='flex flex-col items-center p-4 md:p-6 bg-red-50 border border-red-200 rounded-lg shadow-md'
            variants={detailVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.4 }}
          >
            <FaEnvelope className='text-3xl md:text-4xl text-red-600 mb-3 md:mb-4' />
            <h2 className='text-lg md:text-xl font-semibold text-red-800 mb-2'>Email</h2>
            <p className='text-red-700 text-center font-medium  text-sm md:text-base'>support@texleath.com</p>
          </motion.div>

          <motion.div
            className='flex flex-col items-center p-4 md:p-6 bg-red-50 border border-red-200 rounded-lg shadow-md'
            variants={detailVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
          >
            <FaMapMarkerAlt className='text-3xl md:text-4xl text-red-600 mb-3 md:mb-4' />
            <h2 className='text-lg md:text-xl font-semibold text-red-800 mb-2'>Address</h2>
            <p className='text-red-700 text-center font-medium text-sm md:text-base'>Reiman Road St, Sialkot City, Punjab-Pakistan</p>
          </motion.div>
        </motion.div>

        <motion.div
          className='bg-red-50 p-6 md:p-8 rounded-lg shadow-md'
          variants={textVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.8 }}
        >
          <h2 className='text-xl md:text-2xl font-semibold text-red-800 mb-4 flex items-center'>
            <FaRegHandshake className='text-2xl md:text-3xl text-red-600 mr-3' />
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 mb-2'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md text-sm md:text-base'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md text-sm md:text-base'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block text-gray-700 mb-2'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md text-sm md:text-base'
                rows='4'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='bg-red-800 text-white px-4 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-red-700 transition'
            >
              Send Message
            </button>
          </form>
          {status && <p className='mt-4 text-green-600 text-sm md:text-base'>{status}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerSupport;
