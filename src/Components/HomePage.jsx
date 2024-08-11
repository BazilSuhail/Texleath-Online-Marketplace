import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FiTruck, FiShoppingBag } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import HomePage1 from "../Assets/HomePage1.jpg"

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <section>
        <h1 className='text-2xl my-[50px] md:text-[35px]  text-center font-bold text-red-900'>Recent Updated Catalog</h1>
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
          
        <h1 className='text-2xl my-[50px] md:text-[35px]  text-center font-bold text-red-900'>Shop Now !!</h1>
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

      <section id="services" className="py-16 rounded-t-[65px] lg:rounded-t-[95px] bg-red-400">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-red-600">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FiShoppingBag className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Sales</h3>
              <p>Explore our extensive range of premium clothing. We offer stylish and high-quality garments designed to meet diverse fashion needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FiTruck className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Manufacturing</h3>
              <p>Our cutting-edge manufacturing facilities ensure that each piece of clothing is crafted with precision and care, using the finest materials available.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AiOutlineFileText className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Export</h3>
              <p>We streamline the export process to deliver our premium clothing to international markets efficiently and effectively, ensuring global reach and satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-red-600">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FiShoppingBag className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Sales</h3>
              <p>Explore our extensive range of premium clothing. We offer stylish and high-quality garments designed to meet diverse fashion needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FiTruck className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Manufacturing</h3>
              <p>Our cutting-edge manufacturing facilities ensure that each piece of clothing is crafted with precision and care, using the finest materials available.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AiOutlineFileText className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Export</h3>
              <p>We streamline the export process to deliver our premium clothing to international markets efficiently and effectively, ensuring global reach and satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-red-50">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-red-600">
            What Our Clients Say
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <BiCheckCircle className="text-red-600 text-4xl mb-4 mx-auto" />
              <p className="text-xl">“Texleath Industries has been an incredible partner. Their commitment to quality is evident in every product we receive. Highly recommended!”</p>
              <p className="mt-4 font-semibold">Jane Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <BiCheckCircle className="text-red-600 text-4xl mb-4 mx-auto" />
              <p className="text-xl">“The attention to detail and customer service at Texleath Industries is second to none. I’m always impressed with their professionalism.”</p>
              <p className="mt-4 font-semibold">John Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-red-600">
            Get in Touch
          </h2>
          <p className="text-lg mb-6">Have any questions or inquiries? Feel free to reach out to us and we’ll get back to you as soon as possible.</p>
          <a href="mailto:info@texleath.com" className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600">Email Us</a>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
