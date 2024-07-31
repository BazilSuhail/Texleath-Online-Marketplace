import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { motion } from 'framer-motion';
import ReviewProduct from './ProductReview';

const MediaCarousel = ({ mainImage, otherImages }) => {
  const [activeMedia, setActiveMedia] = useState(mainImage);

  const handleMediaClick = (mediaUrl) => {
    setActiveMedia(mediaUrl);
  };

  return (
    <div className='w-full flex xl:flex-row flex-col'>

      <div className="lg:mb-0 mb-[25px] xl:hidden flex px-[6px] lg:h-[650px] xl:order-1 order-2 otherImages-scrollbar overflow-y-auto">
        <div className='thumbnail m-2 cursor-pointer' onClick={() => handleMediaClick(mainImage)}>
          <div className='w-[150px] h-[180px]'>
            <img
              src={mainImage}
              alt="Sadasd"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className={`rounded-md border-2 ${activeMedia === mainImage ? 'border-blue-500' : 'border-background-color'}`}
            />
          </div>
        </div>
        {otherImages.map((image, index) => (
          <div key={index} className='thumbnail m-2 cursor-pointer' onClick={() => handleMediaClick(image)}>
            <div className='relative w-[150px] h-[180px]'>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className={`rounded-md border-2 ${activeMedia === image ? 'border-blue-500' : 'border-background-color'}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="lg:mb-0 mb-[25px] xl:flex hidden px-[6px] flex-wrap flex-col xl:h-[650px] my-auto overflow-y-hidden">
        <div className='thumbnail m-2 cursor-pointer' onClick={() => handleMediaClick(mainImage)}>
          <div className='w-[140px] h-[160px]'>
            <img
              src={mainImage}
              alt="Sadasd"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className={`rounded-md border-2 ${activeMedia === mainImage ? 'border-blue-500' : 'border-background-color'}`}
            />
          </div>
        </div>
        {otherImages.map((image, index) => (
          <div key={index} className='thumbnail m-2 cursor-pointer' onClick={() => handleMediaClick(image)}>
            <div className='relative w-[140px] h-[160px]'>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className={`rounded-md border-2 ${activeMedia === image ? 'border-blue-500' : 'border-background-color'}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='lg:mb-0 mb-[25px] sm:w-full  mx-auto h-[380px] w-[320px] sm:h-[340px] md:h-[420px] lg:w-[350px] lg:h-[430px] xl:w-[420px] xl:h-[550px]'>
        <div className='relative w-full h-full'>
          <img
            src={activeMedia}
            alt="Main Media"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className='rounded-md'
          />
        </div>
      </div>

    </div>
  );
};


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [key, setKey] = useState(0);

  const [isIncreasing, setisIncreasing] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // State for the selected size
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fetchproducts/products/${id}`);
        setProduct(response.data);
        // Set the first size as selected by default
        if (response.data.size.length > 0) {
          setSelectedSize(response.data.size[0]);
        }
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
    setisIncreasing(true);
    setKey(prevKey => prevKey + 1); // Change key to trigger animation
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    setisIncreasing(false);
    setKey(prevKey => prevKey + 1); // Change key to trigger animation
  };

  /*
  const handleProductReview = (productId) => {
      navigate(`/reviews/${productId}`);
    };
  */

  const handleSizeClick = (size) => {
    setSelectedSize(size); // Update the selected size state
    console.log('Selected size:', size);
  };

  if (!product) return <p>Loading...</p>;

  const discountedPrice = product.sale
    ? (product.price - (product.price * product.sale) / 100).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className=''>

      <div className='w-[96vw] xl:w-[95vw] lg:px-[0px] px-[6px] mx-auto grid grid-cols-1 lg:grid-cols-11'>
        <div className="col-span-7">
          <MediaCarousel
            mainImage={`http://localhost:3001/uploads/${product.image}`}
            otherImages={product.otherImages.map(image => `http://localhost:3001/uploads/${image}`)}
          />
        </div>

        <div className='lg:h-screen xsx:pl-[15px] xsx:mt-[28px] mt-0 flex flex-col col-span-4'>
          <div className='text-lg  w-[140px] py-[3px] text-center rounded-md text-white bg-red-500'>Sale: <span className='font-bold text-xl'>{product.sale}%</span> <span className='text-sm'>OFF</span></div>

          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="text-md mt-[15px] text-white font-normal bg-gray-600 font-serif w-[140px] py-[3px] text-center rounded-lg">{product.category}</div>

          <h1 className="text-lg ml-[9px] underline font-bold">{product.subcategory}</h1>

          <div className="my-[15px]">
            <p className="text-lg font-medium mb-[8px]">Available Sizes:</p>
            <div className="flex flex-wrap">
              {product.size.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 text-xl transition duration-200 font-semibold py-2 m-1 border border-gray-300 rounded ${selectedSize === size ? 'bg-red-800 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xl mt-[25px]">
            {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
            <span className='text-4xl ml-[7px] font-bold'>${discountedPrice}</span>
          </p>   <p className="text-md mt-[10px] flex items-center font-medium"><span className='underline'>Available Stock: </span><span className='text-2xl ml-[6px] text-red-700'>{product.stock}</span></p>

          <p className='text-xl mt-[12px]  font-mono'>Quantity</p>
          <div className="flex items-center mt-[5px]">
            <button onClick={handleDecreaseQuantity} className="text-5xl rounded-md text-white bg-red-800 w-[55px]">-</button>

            <div className="w-[150px] flex justify-center border border-red-800 mx-[-5px] py-[3px] text-4xl">
              <motion.span
                key={key} // Key helps Framer Motion to identify the change in value
                initial={{ opacity: 0, y: isIncreasing ? 12 : -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isIncreasing ? -12 : 12 }} // Increased y value for more visible exit animation

                transition={{ type: "spring", stiffness: 300, duration: 1.2 }}
              >
                {quantity}
              </motion.span>
            </div>

            <button onClick={handleIncreaseQuantity} className="text-5xl rounded-md text-white bg-red-800 w-[55px]">+</button>
          </div>

          <button onClick={handleAddToCart} className="mt-[25px] xl:w-[85%] mx-auto w-[98%] border-2 text-[25px] font-semibold text-red-700 rounded-md hover:bg-red-700 hover:text-white border-red-600  py-[8px]">Add to Cart</button>

          {/*<button className='my-[15px] text-2xl bg-green-800 text-white' onClick={() => handleProductReview(id)}>See Reviews</button>*/}
        </div>
      </div>

      <div className='mt-[35px] xl:mt-[-95px]'>
        <span className='text-3xl ml-[15px] font-bold text-red-900 underline'>Product Description:</span>
        <div className='ml-[25px] text-xl font-medium text-red-950 mt-[5px]'> {product.description}</div>
      </div>

      <div className='mb-[35px] mt-[25px]'>
        <div className='flex flex-col w-screen justify-center items-center'>
          <div className='text-4xl text-red-950 font-bold'>Reviews</div>
          <div className='flex my-[8px] items-center'>
            <div className='w-4 h-4 rounded-full bg-red-800'></div>
            <div className='w-[320px] h-[4px] rounded-xl  mx-[15px] bg-red-800'></div>
            <div className='w-4 h-4 rounded-full bg-red-800'></div>
          </div>

        </div>
      </div>

      <ReviewProduct productId={id} />

    </div>
  );
};

export default ProductDetails;