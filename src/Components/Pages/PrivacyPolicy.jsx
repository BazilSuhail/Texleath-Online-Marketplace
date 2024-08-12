import React, { useRef, useEffect } from 'react';
import { FaShieldAlt, FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PrivacyPolicy = () => {
  const privacyPolicyRef = useRef(null); // Create a ref for the Privacy Policy section

  useEffect(() => {
    if (privacyPolicyRef.current) {
      privacyPolicyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div ref={privacyPolicyRef} className='bg-gray-50 min-h-screen py-8 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <motion.h1
          className='text-3xl font-bold mb-6 text-center text-red-700'
          variants={headingVariants}
          initial='hidden'
          animate='visible'
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className='text-lg text-gray-700 mb-6'
          variants={textVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.6 }}
        >
          At Texleath Industries, your privacy and security are our top priorities. We are committed to protecting your personal information and ensuring your online experience is safe and secure. Below is an outline of our privacy practices and policies.
        </motion.p>
        
        <section className='mb-8'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.2 }}
          >
            <FaShieldAlt className='inline mr-2 text-red-600' />
            Data Protection
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.4 }}
            className='text-gray-700'
          >
            We employ advanced security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Our systems are designed to safeguard your personal and financial information.
          </motion.p>
        </section>
        
        <section className='mb-8'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
          >
            <FaLock className='inline mr-2 text-red-600' />
            Secure Transactions
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.8 }}
            className='text-gray-700'
          >
            All transactions on our site are processed using industry-standard encryption technology to ensure that your payment information is secure. We do not store your credit card information.
          </motion.p>
        </section>
        
        <section className='mb-8'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.0 }}
          >
            <FaCheckCircle className='inline mr-2 text-red-600' />
            Compliance
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.2 }}
            className='text-gray-700'
          >
            Texleath Industries complies with all applicable data protection laws and regulations. We regularly review and update our policies to ensure compliance and address emerging security concerns.
          </motion.p>
        </section>

        <section className='mb-8'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.4 }}
          >
            <FaExclamationTriangle className='inline mr-2 text-red-600' />
            Incident Reporting
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.6 }}
            className='text-gray-700'
          >
            If you suspect any security breach or unauthorized access to your data, please contact us immediately. We have procedures in place to address and resolve any incidents promptly and efficiently.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.8 }}
          >
            <FaShieldAlt className='inline mr-2 text-red-600' />
            Contact Us
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.0 }}
            className='text-gray-700'
          >
            For any questions or concerns regarding our privacy policy, please reach out to us at <a href="mailto:privacy@texleath.com" className='text-red-600 underline'>privacy@texleath.com</a>.
          </motion.p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
