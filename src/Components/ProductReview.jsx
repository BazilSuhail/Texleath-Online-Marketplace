import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"


import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import comments_svg from "../Assets/noComments.webp";
import MainLoader from '../Pages/mainLoader';
import { FiStar } from 'react-icons/fi';

// Custom Components
const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-lg",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )

}


const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}


const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}


const ReviewsList = ({ productId, newReview }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/product-reviews/reviews/${productId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Add new review to local state without refetching
  useEffect(() => {
    if (newReview) {
      setReviews(prev => [newReview, ...prev]);
    }
  }, [newReview]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 4, reviews.length));
  };

  if (loading) return <div className='h-full w-full'><MainLoader /></div>;

  if (error) return (
    <div className='flex justify-center items-center w-full'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className='text-center'
      >
        <img
          src={comments_svg}
          alt='Cart Icon'
          className='mx-auto mix-blend-multiply lg:scale-[0.75] scale-[0.8] w-[280px] h-[280px]'
        />
        <p className='px-[15px] py-[6px] rounded-[8px] mt-[-16px] text-[15px] text-blue-500 font-[600] bg-blue-100 mx-auto text-center'>
          No reviews made till now. <span className='font-[700] text-blue-800'>Make Review NOW !!</span>
        </p>
      </motion.div>
    </div>
  );

  const displayedReviews = reviews.slice(0, visibleCount);

  return (
    <div className="space-y-6 lg:col-span-3 lg:pl-[15px]">
      <h2 className="text-lg font-bold text-gray-900 mb-8">Customer Reviews</h2>

      <AnimatePresence>
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border-[2px] rounded-[15px] border-gray-100 shadow-sm pb-4 bg-gray-50 p-4 last :border-b-0"
          >
            <div className="mb-3">
              <div className='flex w-full items-center justify-between'>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex mt-1 items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.description}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      {reviews.length > visibleCount && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShowMore}
          className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Show More Reviews
        </motion.button>
      )}
    </div>
  );
};

const ReviewProduct = ({ productId }) => {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!user) {
        setError('Please login to submit a review');
        return;
      }

      const reviewData = {
        productId,
        review: {
          name: user.fullName,
          email: user.email,
          phone: user.contact,
          date: new Date(),
          rating,
          description: review
        }
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/product-reviews/reviews`,
        reviewData,
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }
      );

      setNewReview(response.data.review); // Store the new review to pass to ReviewsList
      setSuccess('Review submitted successfully!');
      setRating(1);
      setReview('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 grid lg:grid-cols-5 gap-8"
    >
      <div className="col-span-2 sticky top-0 border-t  border-gray-200 ">

        <Button variant="outline" className="mb-3">
          Write a Review
        </Button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 rounded-lg py-4 px-6 mt-4 mr-5 border-[2px] border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Rating</Label>
              <motion.div
                className="flex items-center space-x-1 mt-2"
                whileTap={{ scale: 0.95 }}
              >
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaStar
                      size={25}
                      className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => handleStarClick(index)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <Label htmlFor="review-comment">Your Review</Label>
              <Textarea
                id="review-comment"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                required
                className="resize-none"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-black hover:bg-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : 'Submit Review'}
              </Button>
            </div>
          </form>

          {/* Notification messages */}
          <AnimatePresence>
            {success && (
              <motion.div
               initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 bg-green-700 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2"
         >
                {success}
              </motion.div>
            )}

            {error && (
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 bg-red-700 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2"
          >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ReviewsList productId={productId} newReview={newReview} />
    </motion.div>
  );
};

export default ReviewProduct;
