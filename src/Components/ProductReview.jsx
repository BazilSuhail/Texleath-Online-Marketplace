import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { IoMail } from "react-icons/io5";
import comments_svg from "../Assets/noComments.webp";
import MainLoader from './Pages/mainLoader';

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product-reviews/reviews/${productId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 4, reviews.length));
  };

  if (loading) return <div className='h-full w-full'> <MainLoader /></div>;
  if (error) return <div className='bg-gray-50 flex justify-center items-center w-full'>
    <div className='text-center'>
      <img
        src={comments_svg}
        alt='Cart Icon'
        className='mx-auto lg:scale-[0.75] scale-[0.8] w-[280px] h-[280px]'
      />
      <p className='px-[15px] py-[6px] rounded-[8px] mt-[-16px] text-[15px] text-blue-500 font-[600] bg-blue-100 mx-auto text-center '>
      No reviews made till now. <span className='font-[700] text-blue-800'>Make Review NOW !!</span>
      </p>

    </div>
  </div>;

  const displayedReviews = reviews.slice(0, visibleCount);

  return (
    <div className='lg:mt-[-15px]  xsx:pt-[150px] pt-[120px] mb-[25px]'>

      {reviews.length === 0 ? (
        <p>No reviews made till now.Make Review NOW !!!</p>
      ) : (
        <ul>
          {displayedReviews.map((review) => (
            <div key={review._id} className='my-[25px] shadow-custom-card w-[98%] z-10 flex flex-col xsx:w-[95%] mx-auto rounded-lg p-[10px]'>
              <div className='flex justify-between'>

                <p className='ml-[8px] text-2xl font-bold'>{review.name}</p>
                <p className='text-gray-700 font-bold'>{new Date(review.date).toLocaleDateString()}</p>
              </div>

              <div className='text-gray-600 mt-[7px] flex items-center ml-[8px] cursor-help'><span className='text-gray-500 mt-[2px] mr-[5px] text-[22px]'><IoMail /></span>{review.email}</div>

              <div className='my-[10px] flex'>
                <div className='text-lg text-gray-500 underline font-medium mr-[10px]'>Rating:</div>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    size={25}
                    key={index}
                    className={index < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <div className='mt-[4px] font-bold text-2xl text-black'>Review: </div>
              <p className='mt-[10px] border-2  overflow-x-auto scrollbar-hide border-gray-300 rounded-md w-[100%] p-[10px] font-bold pt-[10px] text-md text-gray-700'>{review.description}</p>
            </div>
          ))}
        </ul>
      )}
      {visibleCount < reviews.length && (
        <div className='flex bg-white w-[80%] mx-auto pb-[25px] pt-[180px] rounded-full shadow-custom-blured z-50 mt-[-190px]'>
          <button className='bg-red-800 text-white text-xl py-[6px] rounded-md font-semibold mx-auto px-[15px]' onClick={handleShowMore}>Show More</button>
        </div>
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
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
    try {
      if (!user) {
        setError('User not found');
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

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product-reviews/reviews`, reviewData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setSuccess('Review submitted successfully');
      setRating(1);
      setReview('');
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  return (
    <div className='w-[96vw] xl:w-[95vw] mb-[25px] lg:px-[0px] px-[6px] mx-auto grid grid-cols-1 lg:grid-cols-11'>
      <div className='col-span-4'>
        <h1 className="text-2xl font-bold mb-4">Submit Your Review</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center  ml-[19px]">
            <label className="mr-[10px] text-xl font-semibold">Rating:</label>
            {[...Array(5)].map((_, index) => (
              <FaStar
                size={25}
                key={index}
                className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            required
            className="p-2 border-2 border-gray-600 w-[95%] h-[150px] mx-auto text-md font-medium  rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-800 text-white rounded-md"
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className='col-span-7'>
        <ReviewsList productId={productId} />
      </div>
    </div>
  );
};


export default ReviewProduct;
