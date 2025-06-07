import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const panelVariants = {
  hidden: { width: 0 },
  visible: {
    width: 330,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  exit: {
    width: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

const contentVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

const CartModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Expand Width Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-3 bottom-3 right-2 h-auto bg-white z-50 shadow-lg overflow-y-auto rounded-lg p-6"
          >
            {/* Animated Inner Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                {/* Example cart items */}
                <p>🧃 Juice x1</p>
                <p>🍞 Bread x2</p>
                <p>🍎 Apple x3</p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
