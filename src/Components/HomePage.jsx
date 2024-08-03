import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTruck, FiShoppingBag } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';

function HomePage() {
  const useAnimationInView = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return { ref, inView };
  };

  const { ref: aboutRef, inView: aboutInView } = useAnimationInView();
  const { ref: servicesRef, inView: servicesInView } = useAnimationInView();
  const { ref: testimonialsRef, inView: testimonialsInView } = useAnimationInView();
  const { ref: contactRef, inView: contactInView } = useAnimationInView();

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section id="home" className=" text-red-700 flex items-center justify-center text-center relative">
        <div>
          <h1 className="text-[65px] font-extrabold mb-4 loader">Welcome to Texleath Industries</h1> 
          <p className="text-xl mb-8">Crafting Excellence in Clothing Sales, Manufacturing, and Exporting.</p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600">Discover More</button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50" ref={aboutRef}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Image Section */}
            <motion.div
              className={`md:w-1/2 ${aboutInView ? 'animate-fade-up' : 'opacity-0'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
              transition={{ duration: 1 }}
            >
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Texleath Industries" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            {/* Text Section */}
            <motion.div
              className={`md:w-1/2 bg-white p-8 rounded-lg shadow-lg ${aboutInView ? 'animate-fade-up' : 'opacity-0'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-red-600">
                About Us
              </h2>
              <p className="text-lg mb-6">
                Texleath Industries is a leading name in the world of premium clothing. Our dedication to quality and innovation sets us apart. From high-end clothing sales to state-of-the-art manufacturing processes, and a seamless export service, we are committed to excellence at every step.
              </p>
              <p className="text-lg">
                Founded on the principles of quality and customer satisfaction, we pride ourselves on delivering products that exceed expectations. Our team of experts ensures that every garment meets the highest standards of craftsmanship and style.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100" ref={servicesRef}>
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className={`text-4xl font-bold mb-8 text-red-600 ${servicesInView ? 'animate-fade-in' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: servicesInView ? 1 : 0 }}
            transition={{ duration: 4 }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className={`bg-white p-6 rounded-lg shadow-lg ${servicesInView ? 'animate-slide-up' : 'opacity-0'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: servicesInView ? 0 : 20, opacity: servicesInView ? 1 : 0 }}
              transition={{ duration: 2 }}
            >
              <FiShoppingBag className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Sales</h3>
              <p>Explore our extensive range of premium clothing. We offer stylish and high-quality garments designed to meet diverse fashion needs.</p>
            </motion.div>
            <motion.div
              className={`bg-white p-6 rounded-lg shadow-lg ${servicesInView ? 'animate-slide-up' : 'opacity-0'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: servicesInView ? 0 : 20, opacity: servicesInView ? 1 : 0 }}
              transition={{ duration: 2, delay: 0.2 }}
            >
              <FiTruck className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Manufacturing</h3>
              <p>Our cutting-edge manufacturing facilities ensure that each piece of clothing is crafted with precision and care, using the finest materials available.</p>
            </motion.div>
            <motion.div
              className={`bg-white p-6 rounded-lg shadow-lg ${servicesInView ? 'animate-slide-up' : 'opacity-0'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: servicesInView ? 0 : 20, opacity: servicesInView ? 1 : 0 }}
              transition={{ duration: 2, delay: 0.4 }}
            >
              <AiOutlineFileText className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Export</h3>
              <p>We streamline the export process to deliver our premium clothing to international markets efficiently and effectively, ensuring global reach and satisfaction.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-red-50" ref={testimonialsRef}>
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className={`text-4xl font-bold mb-8 text-red-600 ${testimonialsInView ? 'animate-fade-in' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: testimonialsInView ? 1 : 0 }}
            transition={{ duration: 2 }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <motion.div
              className={`bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 ${testimonialsInView ? 'animate-slide-up' : 'opacity-0'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: testimonialsInView ? 0 : 20, opacity: testimonialsInView ? 1 : 0 }}
              transition={{ duration: 2 }}
            >
              <BiCheckCircle className="text-red-600 text-4xl mb-4 mx-auto" />
              <p className="text-xl">“Texleath Industries has been an incredible partner. Their commitment to quality is evident in every product we receive. Highly recommended!”</p>
              <p className="mt-4 font-semibold">Jane Doe</p>
            </motion.div>
            <motion.div
              className={`bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 ${testimonialsInView ? 'animate-slide-up' : 'opacity-0'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: testimonialsInView ? 0 : 20, opacity: testimonialsInView ? 1 : 0 }}
              transition={{ duration: 2, delay: 0.2 }}
            >
              <BiCheckCircle className="text-red-600 text-4xl mb-4 mx-auto" />
              <p className="text-xl">“The attention to detail and customer service at Texleath Industries is second to none. I’m always impressed with their professionalism.”</p>
              <p className="mt-4 font-semibold">John Smith</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100" ref={contactRef}>
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className={`text-4xl font-bold mb-8 text-red-600 ${contactInView ? 'animate-fade-in' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: contactInView ? 1 : 0 }}
            transition={{ duration: 2 }}
          >
            Get in Touch
          </motion.h2>
          <p className="text-lg mb-6">Have any questions or inquiries? Feel free to reach out to us and we’ll get back to you as soon as possible.</p>
          <a href="mailto:info@texleath.com" className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600">Email Us</a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
