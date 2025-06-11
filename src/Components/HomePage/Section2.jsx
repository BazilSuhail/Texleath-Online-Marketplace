import { useState, useEffect } from "react"
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion"

import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';

const Section2 = () => {
  const fashionItems = [
    {
      title: "Elegance Embodied Dress",
      price: "$199.99",
      rowSpan: "md:row-span-2",
      colSpan: "md:col-span-2",
      bgColor: "bg-gray-400"
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
      <div className="grid min-h-[200px] place-content-center md:min-h-[600px] grid-cols-1 md:grid-cols-4 bg-red-500 md:grid-rows-2 gap-4">
        {fashionItems.map((item, index) => (
          <div
            key={index}
            className={`relative  ${item.rowSpan} ${item.colSpan} ${item.bgColor} rounded-lg overflow-hidden flex items-center h-full justify-center p-6`}
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


export default  Section2;