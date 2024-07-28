import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FetchReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Use useCallback to memoize the fetchReviews function
    const fetchReviews = useCallback(async () => {
        if (loading) return; // Prevent duplicate requests while loading

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/reviews/${productId}`, {
                params: { page, limit: 4 }
            });

            // Log response to check for duplicates
            console.log('Fetched reviews:', response.data.reviews);

            // Remove duplicates
            const newReviews = response.data.reviews;
            const uniqueReviews = Array.from(new Map(newReviews.map(review => [review._id, review])).values());

            setReviews(prevReviews => {
                // Combine and filter duplicates
                const allReviews = [...prevReviews, ...uniqueReviews];
                return Array.from(new Map(allReviews.map(review => [review._id, review])).values());
            });

            // Check if there are more reviews to fetch
            setHasMore(response.data.reviews.length > 0);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setHasMore(false); // Stop fetching if there's an error
        } finally {
            setLoading(false);
        }
    }, [loading, page, productId]); // Include all dependencies

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]); // Use fetchReviews in dependency array

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div>
            <h2>Product Reviews</h2>
            <div>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id} className="bg-gray-300 my-[10px] shadow-lg p-4 rounded">
                            <h3 className="text-lg font-semibold">{review.name}</h3>
                            <p>Email: {review.email}</p>
                            <p>Phone: {review.phone}</p>
                            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                            <p>Rating: {review.rating}</p>
                            <p>{review.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
            {hasMore && (
                <button 
                    onClick={handleLoadMore} 
                    disabled={loading} 
                    className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                >
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    );
};


const ReviewProduct = () => {
    const { productId } = useParams();
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:3001/api/auth/profile', {
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/reviews/${productId}`, {
                    params: { page, limit: 4 }
                });
                setReviews(prevReviews => [...prevReviews, ...response.data.reviews]);
                setHasMore(response.data.hasMore);
            } catch (error) {
                setError('Failed to fetch reviews');
            }
        };

        fetchReviews();
    }, [productId, page]);

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

            await axios.post('http://localhost:3001/api/reviews', reviewData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            setSuccess('Review submitted successfully');
            setRating(1);
            setReview('');
        } catch (error) {
            setError('Failed to submit review');
        }
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Submit Your Review</h1>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={rating}
                        min="1"
                        max="5"
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
                    <textarea
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Submit Review
                </button>
            </form>

            <FetchReviews productId={productId} />
            {/*  <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Product Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews.map((review, index) => (
                            <li key={index} className="p-4 border rounded-md">
                                <p><strong>{review.name}</strong> ({review.email})</p>
                                <p>Rating: {review.rating}</p>
                                <p>{review.description}</p>
                                <p><small>{new Date(review.date).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
                {hasMore && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Load More
                    </button>
                )}
            </div> */}
        </div>
    );
};

export default ReviewProduct;
