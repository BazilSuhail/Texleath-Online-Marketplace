import React, { useEffect, useRef, useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What types of clothing does Texleath Industries offer?",
        answer: "Texleath Industries specializes in exporting men's clothing, including categories such as sportswear, fitness wear, safety gear, and many more. We are experts in manufacturing and have a strong network in the e-commerce business."
    },
    {
        question: "How can I place an order?",
        answer: "You can place an order through our website by selecting the desired products and following the checkout process. For bulk or custom orders, please contact our sales team directly."
    },
    {
        question: "What are the payment options available?",
        answer: "We offer various payment options including credit/debit cards, PayPal, and bank transfers. All transactions are securely processed."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping. Please review our shipping policies or contact our support team for more information on shipping rates and delivery times."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of purchase, provided the items are in their original condition. Please refer to our return policy page for detailed instructions on how to process returns."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support team via email at support@texleath.com or through our contact form on the website. We are available to assist you with any inquiries or issues."
    },
    {
        question: "Can I customize my order?",
        answer: "Yes, we offer customization options for bulk orders. Please contact our sales team to discuss your requirements and get a quote."
    },
    {
        question: "What materials are used in your clothing?",
        answer: "We use high-quality materials including cotton, polyester, and blends designed for durability, comfort, and style. Specific material details are provided in the product descriptions on our website."
    },
    {
        question: "Do you have a physical store?",
        answer: "Currently, we operate primarily online. However, we do participate in trade shows and events where you can experience our products in person. Check our website for upcoming events and locations."
    }
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqRef = useRef(null); // Create a ref for the FAQ section

    useEffect(() => {
        if (faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='bg-red-50 min-h-screen py-8 px-4 md:px-8'>
            <div ref={faqRef} className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
                <h1 className='text-2xl md:text-3xl font-bold mb-6 text-center text-red-700'>
                    <FaQuestionCircle className='inline mr-2' />
                    Frequently Asked Questions
                </h1>

                <div className='flex w-[90%] h-4 mx-auto justify-center mb-[25px] items-center'>
                    <div className='w-4 h-[100%] mr-[5px] rounded-full bg-red-800'></div>
                    <div className='h-[3px] w-[89%] mx-auto bg-red-800 '></div>
                    <div className='w-4 h-[100%]  ml-[5px] rounded-full bg-red-800'></div>
                </div>
                
                <p className='text-lg text-red-800 font-medium mb-6'>
                    Welcome to the FAQ section of Texleath Industries. Here you'll find answers to common questions about our products, services, and policies. If you have any other inquiries, feel free to reach out to our customer support team.
                </p>
                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className='mb-4'>
                            <button
                                className='w-full text-left text-lg font-semibold text-red-800 py-2 px-4 bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-between'
                                onClick={() => handleToggle(index)}
                                type='button'
                            >
                                <span>{faq.question}</span>
                                <motion.div
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: openIndex === index ? 0.8 : 1.2 }}
                                    transition={{ duration: 0.5 }}
                                    className='text-red-800'
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
                                        transition={{ duration: 0.3 }}
                                        className='mt-2 px-4'
                                    >
                                        <p className='text-gray-700'>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
