import { useEffect } from 'react';
import { FaRegHandshake, FaListAlt, FaRegClock, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TermsOfService = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='bg-red-50  xsx:pt-[150px] pt-[120px]  min-h-screen py-8 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8'>
        <motion.h1
          className='text-3xl underline md:text-4xl font-bold mb-8 text-red-700 text-center'
          variants={headingVariants}
          initial='hidden'
          animate='visible'
        >
          Terms of Service
        </motion.h1>
        <motion.p
          className='text-lg text-gray-700 mb-8 leading-relaxed'
          variants={textVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.8 }}
        >
          Welcome to Texleath Industries. By using our services, you agree to the following terms and conditions. Please review them carefully to ensure you understand our practices.
        </motion.p>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.2 }}
          >
            <FaRegHandshake className='text-3xl text-red-600 mr-3' />
            Agreement to Terms
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.4 }}
            className='text-gray-700'
          >
            By accessing or using our services, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
          >
            <FaListAlt className='text-3xl text-red-600 mr-3' />
            User Responsibilities
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.8 }}
            className='text-gray-700'
          >
            Users must provide accurate information and use our services responsibly. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.0 }}
          >
            <FaRegClock className='text-3xl text-red-600 mr-3' />
            Service Availability
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.2 }}
            className='text-gray-700'
          >
            We strive to keep our services available and secure, but we do not guarantee uninterrupted access. We may suspend or terminate access to our services at any time for maintenance or other reasons.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.4 }}
          >
            <FaExclamationTriangle className='text-3xl text-red-600 mr-3' />
            Limitation of Liability
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.6 }}
            className='text-gray-700'
          >
            Texleath Industries will not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. Your sole remedy for dissatisfaction is to stop using our services.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.8 }}
          >
            <FaRegHandshake className='text-3xl text-red-600 mr-3' />
            Changes to Terms
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.0 }}
            className='text-gray-700'
          >
            We may update these Terms of Service from time to time. Any changes will be posted on this page, and it is your responsibility to review the terms periodically. Continued use of our services signifies your acceptance of any updates.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-semibold text-red-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.2 }}
          >
            <FaRegHandshake className='text-3xl text-red-600 mr-3' />
            Contact Us
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.4 }}
            className='text-gray-700'
          >
            For any questions regarding these Terms of Service, please contact us at <a href="mailto:terms@texleath.com" className='text-red-600 underline'>terms@texleath.com</a>.
          </motion.p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
