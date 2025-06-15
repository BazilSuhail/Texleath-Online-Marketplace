import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

import { FiStar, FiHeadphones, FiRefreshCw } from 'react-icons/fi';
import { TbCreditCardRefund } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { FaPeoplePulling } from "react-icons/fa6";


import {
  FiShoppingBag,
  FiUsers,
  FiTruck,
  FiSettings,
  FiShield,
  FiZap,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi"

import { FaRegHandshake } from 'react-icons/fa';

import MainLoader from '../Components/Loaders/mainLoader.jsx'

import Section1 from '../Components/HomePage/Section1.jsx'
import Section2 from '../Components/HomePage/Section2.jsx'
import Section3 from '../Components/HomePage/Section3.jsx'
import ScrollWordReveal from '../Components/HomePage/ScrollToReveal.jsx';
import ContactSection from '../Components/HomePage/ContactSection.jsx';

const services = [
  {
    icon: FiSettings,
    title: "Manufacturing",
    description:
      "State-of-the-art manufacturing processes delivering products that exceed expectations in quality and design.",
  },
  {
    icon: FiShoppingBag,
    title: "Sales",
    description:
      "Premium retail experience prioritizing customer needs and delivering exceptional service worldwide.",
  },
  {
    icon: FiGlobe,
    title: "Export",
    description: "Global export services maintaining honesty and transparency in all international dealings.",
  },
  {
    icon: FiZap,
    title: "Customization",
    description: "Utilizing cutting-edge technology to ensure high production standards and personalized solutions.",
  },
  {
    icon: FiTrendingUp,
    title: "Design",
    description: "Crafting unique designs that reflect texleath, style, and contemporary fashion trends.",
  },
  {
    icon: FiUsers,
    title: "Customer Support",
    description: "24/7 exceptional support ensuring complete customer satisfaction and seamless experience.",
  },
]

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

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


const ServiceCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

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
    <main className="font-sans bg-gray-100 min-h-screen text-gray-800">

      <Section1 />

      <ScrollWordReveal />

      <section className='mb-24 mt-32 lg:mt-12'>
        <h3 className='text-[16px] lg:text-[20px] text-center heading-font text-red-700 font-sans font-[600]'>Our Partners</h3>
        {/* Decorative line */}
        <div className="mx-auto mt-2 h-1 w-16 bg-red-700" />

        <div className='md:max-w-4xl mx-auto mt-[15px] lg:mt-16'>
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

      <div className="max-w-7xl mx-auto py-32">
        <div className="relative text-3xl font-semibold leading-relaxed" >
          {/* Gray background layer (static) */}
          <div className="absolute inset-0 w-screen flex flex-wrap text-gray-400 opacity-40 pointer-events-none select-none">

            <div className="slider mt-[-25px] md:mt-[55px] sm:ml-[-150px] " style={{ '--width': '410px', '--height': '150px', '--quantity': 7 }}>
              <div className="list ">
                <div className="stack" style={{ '--position': 1 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 2 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 3 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 4 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 5 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 6 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 7 }}><div className='w-[380px] font-[700] text-[55px]'>New Arrivals</div></div>
              </div>
            </div>

            <div className="slider sm:ml-[-150px] scale-x-[-1]" style={{ '--width': '410px', '--height': '150px', '--quantity': 7 }}>
              <div className="list ">
                <div className="stack" style={{ '--position': 1 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 2 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 3 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 4 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 5 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 6 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
                <div className="stack" style={{ '--position': 7 }}><div className='w-[380px] font-[700] scale-x-[-1] text-[55px]'>New Arrivals</div></div>
              </div>
            </div>
          </div>

          {/* Animated foreground layer */}
          <div className="relative flex justify-center ">
            <section className='flex w-[95%] sm:w-[80%] bg-white/50 shadow-lg backdrop-blur-[3px] rounded-md py-[40px] sm:py-[85px] xsx:py-[105px]' >
              <div className='w-[35%] flex justify-center scale-[] mx-auto bg-red -100'>
                <div className='scale-[0.75] xl:mb-0 mb-3 sm:scale-[1.1] md:scale-[1.3] lg:scale-[1.7] ml-8 sm:ml-12 md:ml-20 lg:ml-24 xl:ml-0  lg:mt-[45px]'>
                  <MainLoader />
                </div>
              </div>


              <div className='w-[60%] flex flex-col justify-center'>
                <p className='text-[22px] sm:text-[32px] md:text-[45px] lg:text-[55px] xl:text-[68px] text-red-700 font-extrabold text-center'>FREE DELIVERY</p>
                <p className='text-[14px] sm:text-[20px] md:text-[28px] lg::text-[48px] xl:text-[45px] text-red-400 font-medium text-center'>ON <span className='text-red-700'>PKR 10,000</span> OR ABOVE</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Featred Products */}
      <section className="py-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured <span className='text-red-600'>Products</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked items that represent the best of our collection.
            </p>
          </motion.div>

          {loading ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm animate-pulse"
                >
                  <div className="h-74 bg-gray-200 rounded-md mb-4"></div> 
                  <div className="h-4 mx-4 bg-gray-300 rounded w-2/4 mb-2"></div>
                  <div className="h-4 mx-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex mx-2 items-center mb-2 space-x-1">
                    <div className="w-10 h-4 bg-gray-300 rounded ml-2 mb-4" />
                  </div>
                </motion.div>
              ))}

            </div>
            :
            <>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => {
                  const discountedPrice = product.sale
                    ? (product.price - (product.price * product.sale) / 100).toFixed(2)
                    : product.price.toFixed(2);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/products/${product._id}`}>
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                          <div className="relative">
                            <img
                              src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                              alt={product.name}
                              className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <button onClick={() => navigate(`/productlist/All`)} className="mx-auto mt-[55px] shop-now relative overflow-hidden px-8 py-2 border-2 border-white text-white text-lg font-bold rounded-[35px] bg-red-700 shadow-md hover:bg-red-800 hover:text-white hover:shadow-lg active:scale-90 transition-transform duration-300">
                  Shop now
                </button>
              </div>
            </>
          }
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              What We <span className="text-red-600">Offer</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              From manufacturing to global export, we provide comprehensive solutions that exceed expectations in every
              aspect of the fashion industry.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      {/* <div className="relative">
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
      </div> */}


      {/* refund wgera */}
      {/* <section className="py-16 px-6 lg:px-[100px]">
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
      </section> */}


      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-600 text-center">
          What Our Clients Say
        </h2>
        <Section3 />
      </section>


      <ContactSection />



    </main>
  );
}

export default Home;
