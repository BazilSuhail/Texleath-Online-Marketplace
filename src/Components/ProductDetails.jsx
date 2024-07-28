import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/fetchproducts/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ id: product._id, quantity }));
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleProductReview = (productId) => {
        navigate(`/reviews/${productId}`);
    };

    if (!product) return <p>Loading...</p>;

    const discountedPrice = product.sale
        ? (product.price - (product.price * product.sale) / 100).toFixed(2)
        : product.price.toFixed(2);
    // <button className='my-[15px] text-2xl bg-green-800 text-white' onClick={() => handleProductReview(id)}>See REviews</button>

    return (
        <>
            <div className="p-4">

                <img
                    src={`/uploads/${product.image}`}
                    alt={product.name}
                    className="w-300 h-300 object-cover mb-4"
                />
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-lg mb-4">{product.description}</p>
                <p className="text-lg">
                    Sizes: {product.size.join(', ')}
                </p>
                <p className="text-lg">
                    Price: ${discountedPrice}
                    {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
                </p>
                <p className="text-lg">Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
                <p className="text-lg">Stock: {product.stock}</p>

                <div className="mt-4">
                    <button onClick={handleDecreaseQuantity} className="px-2 py-1 bg-gray-200">-</button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={handleIncreaseQuantity} className="px-2 py-1 bg-gray-200">+</button>
                    <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-500 text-white ml-4">Add to Cart</button>
                </div>


                <h2 className="text-xl font-bold mt-4">Other Images:</h2>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {product.otherImages.map((image, index) => (
                        image && (
                            <img
                                key={index}
                                src={`/uploads/${image}`}
                                alt={`${product.name} ${index + 1}`}
                                className="w-200 h-200 object-cover"
                            />
                        )
                    ))}
                </div>
            </div>
            <button className='my-[15px] text-2xl bg-green-800 text-white' onClick={() => handleProductReview(id)}>See REviews</button>

        </>
    );
};

export default ProductDetails;
