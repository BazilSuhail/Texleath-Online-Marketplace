import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FiTruck, FiStar, FiHeadphones, FiRefreshCw, FiShield } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import { TbCreditCardRefund } from "react-icons/tb";
import { FaShippingFast, FaStar } from "react-icons/fa";
import { FaArrowRightLong, FaPeoplePulling } from "react-icons/fa6";

import { FaRegHandshake } from 'react-icons/fa';

import MainLoader from './mainLoader'

import { Section1, Section2 } from '../Components/HomePage';
import { SiNextdotjs } from 'react-icons/si';

const features = [
  {
    icon: FiShield,
    title: "Secure Shopping",
    description: "Your data is protected with industry-standard encryption",
  },
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free delivery on orders over $100 worldwide",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
  },
]

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

const reviews = [
  {
    name: "Jane Doe",
    review: "Texleath Industries has been an incredible partner. Their commitment to quality is evident in every product we receive. Highly recommended!",
    email: "jane.doe@example.com",
    rating: 5,
  },
  {
    name: "John Smith",
    review: "The attention to detail and customer service at Texleath Industries is second to none. I’m always impressed with their professionalism.",
    email: "john.smith@example.com",
    rating: 4,
  },
  {
    name: "Emily Johnson",
    review: "Exceptional quality and excellent service. Texleath Industries exceeds expectations every time!",
    email: "emily.johnson@example.com",
    rating: 3,
  },
  {
    name: "Michael Brown",
    review: "I've been consistently impressed with the products from Texleath Industries. Their attention to detail is unmatched.",
    email: "michael.brown@example.com",
    rating: 4,
  },
  {
    name: "Sarah Wilson",
    review: "Texleath Industries provides top-notch products and excellent customer support. I highly recommend them!",
    email: "sarah.wilson@example.com",
    rating: 5,
  },
  {
    name: "David Lee",
    review: "A fantastic company with exceptional quality. I’ve always been satisfied with their products and service.",
    email: "david.lee@example.com",
    rating: 5,
  },
];

const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/homeproducts`); // Adjust API endpoint as needed
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  if (error) {
    console.log(error);
  }


  return (
    <main className="font-sans bg-gray-50 min-h-screen text-gray-800">

      <Section1 />
 
      <section className='mb-24 mt-40'>
        <h3 className='text-[16px] text-center heading-font text-red-700 font-sans font-[600]'>POWERED BY</h3>
        {/* Decorative line */}
        <div className="mx-auto mt-2 h-1 w-16 bg-red-700" />

        <div className='md:max-w-4xl mx-auto mt-[15px]'>
          <div className="slider " style={{ '--width': '120px', '--height': '100px', '--quantity': 5 }}>
            <div className="list ">
              <div className="stack" style={{ '--position': 1 }}><div className='w-[110px]'><img src="/logos/nike.png" alt="Nike Logo" className='' /></div></div>
              <div className="stack" style={{ '--position': 2 }}><div className='w-[110px]'><img src="/logos/adidas.png" alt="Nike Logo" className='' /></div></div>
              <div className="stack" style={{ '--position': 3 }}><div className='w-[110px]'><img src="/logos/levi.png" alt="Nike Logo" className='mt-[38px]' /></div></div>
              <div className="stack" style={{ '--position': 4 }}><div className='w-[110px]'><img src="/logos/ck.png" alt="Nike Logo" className='mix-blend-overlay scale-[0.75]' /></div></div>
              <div className="stack" style={{ '--position': 5 }}><div className='w-[110px]'><img src="/logos/boss.png" alt="Nike Logo" className='mix-blend-darken mt-[38px]' /></div></div>
            </div>
          </div>
        </div>
      </section>


      <Section2 />
      {/* <Section2 /> */}


      <div className='h-[4px] w-[95%] mx-auto my-[45px] rounded-lg bg-red-700'></div>

      <section className='md:w-[90%] w-[95%] mt-[35px] xl:w-[80%] mx-auto flex  bg-gradient-to-tr from-red-800 via-red-950 to-red-800 rounded-md py-[40px] sm:py-[85px] xsx:py-[105px]' >
        <div className='w-[40%] mt-[-28px] lg:mt-[-15px] xl:mt-[5px] sm:ml-[45px] ml-[35px] mr-[-45px] scale-75 sm:scale-125 xsx:scale-150'>
          <div className="cycle-loader"></div>
        </div>
        <div className='w-[60%] flex flex-col justify-center'>
          <p className='text-[30px] sm:text-[45px] xsx:text-[55px] xl:text-[68px] text-white font-extrabold text-center'>FREE DELIVERY</p>
          <p className='text-[17px] sm:text-[32px] xsx:text-[40px] xl:text-[50px] text-red-200 font-medium text-center'>ON <span className='text-red-500'>PKR 10,000</span> OR ABOVE</p>
        </div>
      </section>

      {/* <section className='w-[100%] mt-[85px] '>
        <div className="slider" style={{ '--width': '680px', '--height': '132px', '--quantity': 4 }}>
          <div className="list">
            <div className="techtoday" style={{ '--position': 1 }}><div className='text-black text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 2 }}><div className='text-white text-shadow-custom text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 3 }}><div className='text-black text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 4 }}><div className='text-white text-shadow-custom font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
          </div>
        </div>
      </section>
       */}

      <section className='md:max-w-7xl mx-auto mt-[15px]'>
        <div className="slider " style={{ '--width': '410px', '--height': '150px', '--quantity': 4 }}>
          <div className="list ">
            <div className="stack" style={{ '--position': 1 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div> 
            <div className="stack" style={{ '--position': 2 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div> 
            <div className="stack" style={{ '--position': 3 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div> 
            <div className="stack" style={{ '--position': 4 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div> 
          </div>
        </div>
      </section>

      {/* <section className='md:max-w-7xl mx-auto mt-[15px]'>
  <div className="slider " style={{ '--width': '410px', '--height': '150px', '--quantity': 4 }}>
    <div className="list ">
      <div className="stack" style={{ '--position': 1 }}><div className='w-[380px] font-[800] text-[55px]'>New Arrivals</div></div>
      <div className="stack" style={{ '--position': 2 }}><div className='w-[380px] font-[800] text-[55px] text-white text-stroke text-stroke-gray-500'>New Arrivals</div></div>  
      <div className="stack" style={{ '--position': 3 }}><div className='w-[380px] font-[800] text-[55px]'>New Arrivals</div></div>
      <div className="stack" style={{ '--position': 4 }}><div className='w-[380px] font-[800] text-[55px] text-white text-stroke'>New Arrivals</div></div>  
    </div>
  </div>
</section> */}

      <div className='h-[3px] w-screen mx-auto bg-red-200 mt-[-15px]'></div>

      {
        loading ?
          <MainLoader /> :
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Handpicked items that represent the best of our collection.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => {
                  const discountedPrice = product.sale
                    ? (product.price - (product.price * product.sale) / 100).toFixed(2)
                    : product.price.toFixed(2);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/product/${product.id}`}>
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                          <div className="relative">
                            <img
                              src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                              alt={product.name} 
                              className="w-full  object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.originalPrice > product.price && (
                              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Sale</Badge>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">${product.price}</span>
                              {discountedPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">${discountedPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className='w-full flex'>
                <button onClick={() => navigate(`/productlist/All`)} className="mx-auto shop-now relative overflow-hidden px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-[35px] bg-red-500 shadow-md hover:bg-red-800 hover:text-white hover:shadow-lg active:scale-90 transition-transform duration-300">
                  Shop now
                </button>
              </div>
            </div>
          </section>
      }

      {/* Features Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-red-600">Elegance</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience premium quality, exceptional service, and unmatched style with every purchase.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* refund wgera */}
      <section className="py-16 bg-gray-100 px-6 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <TbCreditCardRefund className="text-red-600 text-[105px] mb-4 mx-auto" />
            <h3 className="text-3xl font-bold text-red-800 text-center mb-2">Free Shipping</h3>
            <p className='text-gray-400 font-serif text-center'>Receive your product Within 2-3 Working days. Free Cash on Delivery all over Pakistan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg md:mb-[45px] shadow-lg">
            <FaShippingFast className="text-red-600 text-[105px] mb-4 mx-auto" />
            <h3 className="text-3xl font-bold text-red-800 text-center mb-2">Return or Refunded</h3>
            <p className='text-gray-400 font-serif text-center'>You can return your product within 7 days of receiving it. To request a refund.</p>
          </div>
          <div className="bg-white p-6 rounded-lg  shadow-lg">
            <FaPeoplePulling className="text-red-600 text-[105px] mb-4 mx-auto" />
            <h3 className="text-3xl font-bold text-red-800 text-center mb-2">Customer Support</h3>
            <p className='text-gray-400 font-serif text-center'>24/7 customer support that is respectful and helpful "Your satisfaction is our top priority.</p>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className='md:w-[90%] xl:w-[85%] w-[95%] mb-[45px] mx-auto mt-[35px]'>
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-600 text-center">
            What Our Clients Say
          </h2>
{/* 
          <div className='flex w-full h-2 sm:h-4 mx-auto justify-center mb-[25px] items-center'>
            <div className='w-2 sm:w-4 h-[100%] mr-[5px] rounded-full bg-red-300'></div>
            <div className='h-[3px] w-[89%] mx-auto bg-red-300 '></div>
            <div className='w-2 sm:w-4 h-[100%]  ml-[5px] rounded-full bg-red-300'></div>
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">

                <div className='flex items-center'>
                  <BiCheckCircle className="text-red-300 mr-[15px] text-[45px]" />
                  <div className='flex flex-col'>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.email}</p>
                  </div>
                </div>

                <div className="flex mt-2">
                  <p className='mr-[12px] text-red-300 text-sm font-medium underline'>Rating:</p>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      size={18}
                      className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>

                <p className="text-md text-red-950 font-serif  my-4">{review.review}</p>

              </div>
            ))}
          </div>
        </div>
      </section>


      <div className='h-[4px] max-w-7xl mx-auto my-[45px] rounded-lg bg-red-100'></div>

      <section className='md:w-[90%] xl:w-[55%] w-[95%]  mb-[45px] mx-auto mt-[35px]'>
        <div className='flex w-full justify-center mb-[35px] items-center mx-auto'>
          <FaRegHandshake className='text-[45px] md:text-[75px] text-red-900 mr-3' />
          <h2 className="text-2xl md:text-4xl font-bold mb-1 text-red-800 text-center"> Lets Get in Touch</h2>
        </div>

        <div className=' p-6 md:p-8 rounded-lg shadow-custom-card'>
          <h2 className='text-xl md:text-2xl font-semibold text-red-800 mb-4 flex items-center'>
            Contact Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 bg-red-50 py-2 border border-red-100 rounded-md text-sm md:text-base'
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
                className='w-full bg-white  px-4 py-2 border border-red-100 rounded-md text-sm md:text-base'
                rows='4'
                required
              ></textarea>
            </div>
            <button type='submit' className='bg-red-800 text-white px-4 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-red-700 transition'>
              Send Message
            </button>
          </form>
          {status && <p className='mt-4 text-green-600 text-sm md:text-base'>{status}</p>}
        </div>
      </section>

      {/* Hero Section
      
      <section id="home" className="text-red-700 flex items-center justify-center text-center relative">
        <div>
          <h1 className="text-[65px] font-extrabold mb-4">Welcome to Texleath Industries</h1>
          <p className="text-xl mb-8">Crafting Excellence in Clothing Sales, Manufacturing, and Exporting.</p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600">Discover More</button>
        </div>
      </section>
      */}


      {/* About Us Section 
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8"> 
            <div className="md:w-1/2">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Texleath Industries"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div> 
            <div className="md:w-1/2 p-8 ">
              <h2 className="text-4xl font-bold mb-6 text-red-600">
                About Us
              </h2>
              <p className="text-lg mb-6">
                Texleath Industries is a leading name in the world of premium clothing. Our dedication to quality and innovation sets us apart. From high-end clothing sales to state-of-the-art manufacturing processes, and a seamless export service, we are committed to excellence at every step.
              </p>
              <p className="text-lg">
                Founded on the principles of quality and customer satisfaction, we pride ourselves on delivering products that exceed expectations. Our team of experts ensures that every garment meets the highest standards of craftsmanship and style.
              </p>
            </div>
          </div>
        </div>
      </section >
      */}



    </main>
  );
}

export default Home;
