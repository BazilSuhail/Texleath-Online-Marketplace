import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FiTruck, FiShoppingBag } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import { TbCreditCardRefund } from "react-icons/tb";
import { FaShippingFast, FaStar } from "react-icons/fa";
import { FaPeoplePulling } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";

import { FaRegHandshake } from 'react-icons/fa';

import HomePage1 from "../Assets/HomePage1.jpg"

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

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/homeproducts'); // Adjust API endpoint as needed
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(error);
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
  //if (error) return <p>Error: {error}</p>;


  return (
    <main className="font-sans bg-gray-50 min-h-screen text-gray-800">

      <section className='px-[10px] pt-[8px]'>
        <img src={HomePage1} alt="" className='rounded-lg w-full lg:h-[570px]' />
      </section>

      <section className='lg:mt-[45px] mt-[25px]'>
        <h1 className='text-2xl mb-[20px] md:text-[35px]  text-center font-bold text-red-900'>Popular Categories</h1>
        <div className='md:w-[90%]  xl:w-[60%] mx-auto grid grid-cols-3'>
          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Sports Wear</div>
          </div>

          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Active Wear</div>
          </div>

          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Gym Wear</div>
          </div>

          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Gloves</div>
          </div>

          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Fitness Wear</div>
          </div>

          <div>
            <div className='w-[90px] md:w-[160px] mx-auto rounded-full h-[90px] md:h-[160px] bg-red-900 mt-5 md:mt-10 '></div>
            <div className='text-red-800 font-bold md:mt-[10px] mt-[8px] text-center text-[14px] md:text-[20px]'>Safety Wear</div>
          </div>

        </div>
      </section>

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

      <section className='w-[100%] mt-[85px] '>
        <div className="slider" style={{ '--width': '680px', '--height': '132px', '--quantity': 4 }}>
          <div className="list">
            <div className="techtoday" style={{ '--position': 1 }}><div className='text-black text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 2 }}><div className='text-white text-shadow-custom text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 3 }}><div className='text-black text-center font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
            <div className="techtoday" style={{ '--position': 4 }}><div className='text-white text-shadow-custom font-extra-black text-[45px] md:text-[60px]'>NEW ARRIVALS</div></div>
          </div>
        </div>
      </section>

      <div className='h-[3px] w-screen mx-auto bg-red-200 mt-[-15px]'></div>

      {/* Hero Section*/}
      <section className='mb-[45px]'>
        <h1 className='text-2xl my-[50px] md:text-[35px] text-center font-bold text-red-900'>Recent Updated Catalog</h1>
        <div className="mx-auto my-[45px] grid grid-cols-2 overflow-hidden lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const discountedPrice = product.sale
              ? (product.price - (product.price * product.sale) / 100).toFixed(2)
              : product.price.toFixed(2);

            return (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="block p-[10px] overflow-x-hidden sm:p-[5px] cursor-pointer"
              >
                <img
                  loading="lazy"
                  src={`http://localhost:3001/uploads/${product.image}`}
                  alt={product.name}
                  className="object-cover mx-auto h-[200px] w-[180px] hover:scale-105 transition duration-700 md:h-[400px] md:w-[340px] lg:w-[300px] lg:h-[335px] sm:h-[320px] sm:w-[280px] mb-4"
                />
                <div className="mx-auto w-[180px] md:w-[340px] lg:w-[300px] sm:w-[280px]">
                  <h1 className="text-xl md:text-[25px] lg:text-[30px] mb-[15px] font-medium">{product.name}</h1>

                  {product.sale && (
                    <span className="text-red-500 bg-red-200 font-medium rounded-xl text-[12px] px-[12px] line-through">
                      Rs.{product.price.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[20px] lg:text-[28px] ml-[6px] mb-[3px] font-medium">
                    <span className="text-[20px] font-normal"> Rs.</span>{parseInt(discountedPrice)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-full flex'>
          <button onClick={() => navigate(`/productlist/All`)} className="mx-auto shop-now relative overflow-hidden px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-[35px] bg-red-500 shadow-md hover:bg-red-800 hover:text-white hover:shadow-lg active:scale-90 transition-transform duration-300">
            Shop now
          </button>
        </div>
      </section>

      <section className="pb-16 flex flex-col items-center bg-red-950">
        <h2 className="text-4xl text-ceter mt-[25px] font-bold mb-8 text-red-50">
          Our Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
          <div className="h-[135px] w-[125px] flex flex-col justify-center items-center">
            <div className='bg-white rounded-full h-[85px] w-[85px] sm:h-[80px] sm:w-[80px] flex items-center justify-center'>
              <FiShoppingBag className="text-red-600 text-[38px] sm:text-[45px] my-auto" />
            </div>
            <h3 className="text-2xl text-red-200 font-bold mt-[10px]">Sales</h3>
          </div>

          <div className="h-[135px] w-[125px] flex flex-col justify-center items-center">
            <div className='bg-white rounded-full h-[85px] w-[85px] sm:h-[80px] sm:w-[80px] flex items-center justify-center'>
              <AiOutlineFileText className="text-red-600 text-[38px] sm:text-[45px] my-auto" />
            </div>
            <h3 className="text-2xl text-red-200 font-bold mt-[10px]">Style</h3>
          </div>

          <div className="h-[135px] w-[125px] flex flex-col justify-center items-center">
            <div className='bg-white rounded-full h-[85px] w-[85px] sm:h-[80px] sm:w-[80px] flex items-center justify-center'>
              <BiSolidCustomize className="text-red-600 text-[38px] sm:text-[45px] my-auto" />
            </div>
            <h3 className="text-2xl text-red-200 font-bold mt-[10px]">Craft</h3>
          </div>

          <div className="h-[135px] w-[125px] flex flex-col justify-center items-center">
            <div className='bg-white rounded-full h-[85px] w-[85px] sm:h-[80px] sm:w-[80px] flex items-center justify-center'>
              <FiTruck className="text-red-600 text-[38px] sm:text-[45px] my-auto" />
            </div>
            <h3 className="text-2xl text-red-200 font-bold mt-[10px]">Export</h3>
          </div>
        </div>
      </section>

      {/* refund wgera */}
      <section className="py-16 bg-gray-100 px-6 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <TbCreditCardRefund className="text-red-600 text-[105px] mb-4 mx-auto" />
            <h3 className="text-3xl font-bold text-red-800 text-center mb-2">Free Shipping</h3>
            <p className='text-gray-400 font-serif text-center'>Receive your product Within 2-3 Working days. Free Cash on Delivery all over Pakistan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg mb-[45px] shadow-lg">
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

          <div className='flex w-full h-2 sm:h-4 mx-auto justify-center mb-[25px] items-center'>
            <div className='w-2 sm:w-4 h-[100%] mr-[5px] rounded-full bg-red-300'></div>
            <div className='h-[3px] w-[89%] mx-auto bg-red-300 '></div>
            <div className='w-2 sm:w-4 h-[100%]  ml-[5px] rounded-full bg-red-300'></div>
          </div>

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


      <div className='h-[4px] w-[95%] mx-auto my-[45px] rounded-lg bg-red-700'></div>
      
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
                className='w-full px-4 bg-red-100 py-2 border border-red-800 rounded-md text-sm md:text-base'
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
                className='w-full bg-red-100  px-4 py-2 border border-red-900 rounded-md text-sm md:text-base'
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

export default HomePage;
