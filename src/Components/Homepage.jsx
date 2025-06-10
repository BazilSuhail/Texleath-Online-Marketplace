import { useState, useEffect } from "react" 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion"

function Section1() {
  const colors = [
    { name: "green", bg: "bg-green-500",img:"/2.png" },
    { name: "red", bg: "bg-red-500",img:"/3.png" },
    { name: "yellow", bg: "bg-yellow-500",img:"/2.png" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goRight = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length)
  }

  const goLeft = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
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
    <div className="relative h-[calc(100vh-80px)] w-screen overflow-hidden bg-black">
      {/* Background color layer to prevent white flashing */}
      <div className={`absolute inset-0 ${colors[currentIndex].bg}`} />

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
            className="text-6xl font-bold text-white capitalize drop-shadow-lg"
            initial={{ opacity: 0,x: direction !== 1 ? -350 : 350 }}
            animate={{ opacity: 1,x:0}}
            exit={{ opacity: 0,x:direction === 1 ? -350 : 350  }}
            transition={{ duration: 0.8 }}
          >
            {colors[currentIndex].name}
            

            <img src={colors[currentIndex].img} alt="" />
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white shadow-lg" : "bg-white/40"
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

 
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';

const Section2 = () => {
  const fashionItems = [
    {
      title: "Elegance Embodied Dress",
      price: "$199.99",
      rowSpan: "md:row-span-2",
      colSpan: "md:col-span-2",
      bgColor: "bg-gray-100"
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
 

export { Section1,Section2 };