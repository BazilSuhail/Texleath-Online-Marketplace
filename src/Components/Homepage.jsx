import { useState, useEffect } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion"

import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import { Link } from "react-router-dom";


function Section1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-4xl md:text-6xl mb-12 mt-[-50px] font-[700] text-red-800 title-poppins">
        A place to Everyone's  <br /> <span className="text-red-800"><span className="text-red-600">Collection</span> and  <span className="text-red-600">Style.</span></span>
      </h1>

      {/* Artist tags */}
      <div className="relative w-full max-w-5xl mt-8 mb-12">
        <div className="absolute left-[18%] -rotate-[6deg] top-[-2rem] bg-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          @coplin
        </div>
        <div className="absolute right-[18%] rotate-[6deg] top-[-2rem] bg-red-200 text-red-700 px-3 py-1  rounded-full text-sm font-semibold shadow-md">
          @andrea
        </div>

        {/* Artworks */}
        <div className="flex justify-center space-x-[-30px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-red-500 shadow-lg transform translate-y-6 rotate-[-15deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 1
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-blue-200 shadow-lg transform translate-y-5 rotate-[-6deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 2
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-yellow-400 shadow-lg transform -translate-y-4 rotate-[-2deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 3
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            className="w-32 z-10 h-40 md:w-40 md:h-52 rounded-xl bg-pink-300 shadow-lg transform -translate-y-8 rotate-[0deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 4
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-orange-700 shadow-lg transform -translate-y-4 rotate-[2deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 5
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-red-400 shadow-lg transform translate-y-5 rotate-[6deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 6
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1, rotate: 8 }}
            className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-green-700 shadow-lg transform translate-y-6 rotate-[12deg] flex items-center justify-center text-white font-bold cursor-pointer"
          >
            Art 7
          </motion.div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Artists can display their masterpieces, and buyers can discover and
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
     <Link to="/productlist/All">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
          className="bg-red-700 text-white px-6 py-2 rounded-full font-medium"
        >
         Shop Now
        </motion.button>
        </Link>
        <button className="text-black underline font-medium">Read more</button>
      </div>
    </motion.div>
  );
}

 

const Slide1 = () => {
  return (
    <section className="relative bg-gray-50 h-screen w-full overflow-hidden">
      {/* Background image of the girl */}
      {/* <div className="absolute inset-0  lg:scale-[1.5] lg:ml-[795px] bg-black bg-[url('/home/3.png')] bg-fit bg-center bg-no-repeat">
  im
  </div> */}
      <div className="absolute inset-0 flex flex-col ">
        <img src="/home/3.png" alt="" className="lg:scale-[1.3] scale-[1.8] lg:mt-[120px] mt-[555px] lg:ml-[695px] " />
      </div>

      {/* Overlay gradient - fixed typo from "bg -gradient" to "bg-gradient" */}
      <div className="absolute inset-0 " />

      {/* Content container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex pt-[50px] md:pt-[80px]">
        <div className="max-w-4xl">
          {/* "New Arrival" text with decorative elements */}
          <div className="relative  mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              NEW ARRIVAL
            </h2>
            {/* Decorative line */}
            <div className="absolute -bottom-3 left-0 h-1 w-16 bg-red-700" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-[600] leading-tight text-gray-900 mb-6">
            <p className="font-[600] font-serif">Everyone's</p>
            <p className="font-serif">collection <span className="text-red-500">and</span> <span className="text-white">style</span></p>
          </h1>

          {/* Description text */}
          <p className="text-lg mt-[-45px] md:mt-[65px] md:text-md font-[600] border-l-[3px] border-gray-300 pl-[15px] text-gray-500 mb-8 max-w-lg">
            A collection of clothes with<br />
            contemporary styles and<br />
            trends that make you look
          </p>

          {/* Shop now button */}
          <button className="px-8 py-2 bg-red-700 text-[14px] rounded-[6px] text-white font-medium hover:bg-red-900 transition-colors duration-300">
            Shop Now
          </button>

          {/* Decorative circle elements */}
          <div className="absolute right-130 top-15 w-40 h-40 rounded-full border-4 border-red-600 opacity-30" />
          <div className="absolute right-175 top-8 w-30 h-30 rounded-full border-4 border-red-600 opacity-30" />
          <div className="absolute right-140 top-10 w-45 h-45 rounded-full bg-red-800/30" />
        </div>
      </div>
    </section>
  );
};

const Slide2 = () => {
  return (
    <section className="relative bg-gray-50 h-screen w-full overflow-hidden">
      {/* Background image of the girl */}
      {/* <div className="absolute inset-0  lg:scale-[1.5] lg:ml-[795px] bg-black bg-[url('/home/3.png')] bg-fit bg-center bg-no-repeat">
  im
  </div> */}
      <div className="absolute inset-0 flex flex-col ">
        <img src="/home/2.png" alt="" className="lg:scale-[1.4] scale-[2.2] lg:mt-[100px] mt-[555px] ml-[105px] lg:ml-[785px] " />
      </div>

      {/* Overlay gradient - fixed typo from "bg -gradient" to "bg-gradient" */}
      <div className="absolute inset-0 " />

      {/* Content container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex  pt-[50px] md:pt-[80px]">
        <div className="max-w-4xl">
          {/* "New Arrival" text with decorative elements */}
          <div className="ml-auto relative  mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              NEW ARRIVAL
            </h2>
            {/* Decorative line */}
            <div className="absolute -bottom-3 left-0 h-1 w-16 bg-red-700" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-[600] leading-tight text-gray-900 mb-6">
            <p className="font-[600] font-serif">Everyone's</p>
            <p className="font-serif">collection <span className="text-red-500">and</span> <span className="text-white">style</span></p>
          </h1>

          {/* Description text */}
          <p className="text-lg mt-[-55px] md:mt-[65px] md:text-md font-[600] border-l-[3px] border-gray-300 pl-[15px] text-gray-500 mb-8 max-w-lg">
            A collection of clothes with<br />
            contemporary styles and<br />
            trends that make you look
          </p>

          {/* Shop now button */}
          <button className="px-8 py-2 bg-red-700 text-[14px] rounded-[6px] text-white font-medium hover:bg-red-900 transition-colors duration-300">
            Shop Now
          </button>

          {/* Decorative circle elements */}
          <div className="absolute right-20 top-2 w-40 h-40 rounded-full border-4 border-red-600 opacity-30" />
          <div className="absolute right-25 top-10 w-30 h-30 rounded-full bg-red-800 opacity-20" />
        </div>
      </div>
    </section>
  );
};


const Slide3 = () => {
  return (
    <section className="relative bg-gray-50 h-screen w-full overflow-hidden">
      {/* Background image of the girl */}
      {/* <div className="absolute inset-0  lg:scale-[1.5] lg:ml-[795px] bg-black bg-[url('/home/3.png')] bg-fit bg-center bg-no-repeat">
  im
  </div> */}
      <div className="absolute inset-0 flex flex-col ">
        <img src="/home/4.png" alt="" className="lg:scale-[1.2] scale-[2.2] lg:mt-[150px] mt-[575px] ml-[105px] lg:ml-[585px] " />
      </div>

      {/* Overlay gradient - fixed typo from "bg -gradient" to "bg-gradient" */}
      <div className="absolute inset-0 " />

      {/* Content container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex  pt-[50px] md:pt-[80px]">
        <div className="max-w-4xl">
          {/* "New Arrival" text with decorative elements */}
          <div className="ml-auto relative  mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              NEW ARRIVAL
            </h2>
            {/* Decorative line */}
            <div className="absolute -bottom-3 left-0 h-1 w-16 bg-red-700" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-[600] leading-tight text-gray-900 mb-6">
            <p className="font-[600] font-serif">Everyone's</p>
            <p className="font-serif">collection <span className="text-red-500">and</span> <span className="text-white">style</span></p>
          </h1>

          {/* Description text */}
          <p className="text-lg mt-[-55px] md:mt-[65px] md:text-md font-[600] border-l-[3px] border-gray-300 pl-[15px] text-gray-500 mb-8 max-w-lg">
            A collection of clothes with<br />
            contemporary styles and<br />
            trends that make you look
          </p>

          {/* Shop now button */}
          <button className="px-8 py-2 bg-red-700 text-[14px] rounded-[6px] text-white font-medium hover:bg-red-900 transition-colors duration-300">
            Shop Now
          </button>

          {/* Decorative circle elements */}
          <div className="absolute right-20 top-2 w-40 h-40 rounded-full border-4 border-red-600 opacity-30" />
          <div className="absolute right-25 top-10 w-30 h-30 rounded-full bg-red-800 opacity-20" />
        </div>
      </div>
    </section>
  );
};


const Section2 = () => {
  const fashionItems = [
    {
      title: "Elegance Embodied Dress",
      price: "$199.99",
      rowSpan: "md:row-span-2",
      colSpan: "md:col-span-2",
      bgColor: "bg-gray-500"
    },
    {
      title: "Simplicity Blouse",
      price: "$129.99",
      rowSpan: "md:row-span-1",
      colSpan: "md:col-span-1",
      bgColor: "bg-gray-200"
    },
    {
      title: "Regal Touch Pants",
      price: "$149.99",
      rowSpan: "md:row-span-1",
      colSpan: "md:col-span-1",
      bgColor: "bg-gray-300"
    },
    {
      title: "Comprehensive Guide To The World Of Fashion",
      price: "1000+",
      rowSpan: "md:row-span-2",
      colSpan: "md:col-span-2",
      bgColor: "bg-black text-white",
      isHeader: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        {fashionItems.map((item, index) => (
          <div
            key={index}
            className={`relative ${item.rowSpan} ${item.colSpan} ${item.bgColor} rounded-lg overflow-hidden min-h-[200px] md:min-h-[300px] flex items-center justify-center p-6`}
          >
            {!item.isHeader && (
              <>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                    <FiHeart className="text-gray-700" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                    <FiEye className="text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-700">{item.price}</p>
                </div>
                <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition">
                  <FiShoppingBag />
                </button>
              </>
            )}

            {item.isHeader && (
              <div className="text-center p-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl">{item.price}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export { Section1, Section2 };