import { useState, useEffect } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion"

import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';

function Section1() {
  const colors = [
    { name: "green", bg: "bg-green-500", img: "/2.png", component: <Slide1 /> },
    { name: "red", bg: "bg-red-500", img: "/3.png", component: <Slide2 /> },
    { name: "yellow", bg: "bg-yellow-500", img: "/2.png", component: <Slide3 /> },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goRight = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length)
  }

  const goLeft = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + colors.length) % colors.length)
  }

  // Reset animation flag when animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with your animation duration
    return () => clearTimeout(timer)
  }, [currentIndex])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100vw" : "-100vw",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100vw" : "-100vw",
      opacity: 1,
      zIndex: 0,
    }),
  }

  const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  }

  return (
    <div className="relative h-[calc(100vh-70px)] lg:h-[calc(100vh-80px)] w-screen overflow-hidden bg-black">
      {/* Background color layer to prevent white flashing */}
      <div className={`absolute inset-0 bg-gray-50`} />

      {/* Sliding container */}
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className={`absolute inset-0 w-screen h-full bg-white $ {colors[currentIndex].bg} flex items-center justify-center`}
        >
          <motion.h2
            className="w-full h-full font-bold text-white capitalize bg-gray-50"
            initial={{ opacity: 0, x: direction !== 1 ? -350 : 350 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -350 : 350 }}
           transition={{ 
    duration: 1.2,
    ease: [0.16, 0.77, 0.47, 0.97], // Slow start (ease-in), fast finish (ease-out)

  }}
          >
            {/* {colors[currentIndex].name}
            

            <img src={colors[currentIndex].img} alt="" /> */}
            {colors[currentIndex].component}
          </motion.h2>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <motion.button
          onClick={goLeft}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-4 shadow-lg"
          aria-label="Previous color"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          onClick={goRight}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-4 shadow-lg"
          aria-label="Next color"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          <FaArrowRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Current position indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {colors.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white shadow-lg" : "bg-white/40"
              }`}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>
    </div>
  )
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