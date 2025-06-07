import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { motion } from 'framer-motion';
import ReviewProduct from './ProductReview';
import MainLoader from './Pages/mainLoader';


const MediaCarousel = ({ mainImage, otherImages }) => {
  const [activeMedia, setActiveMedia] = useState(mainImage);

  const handleMediaClick = (mediaUrl) => {
    setActiveMedia(mediaUrl);
  };

  return (
    <div className='w-full flex xl:flex-row flex-col'>
      <div className="lg:mb-0 mb-[25px] xl:hidden flex px-[6px] xl:h-[650px] xl:order-1 order-2 otherImages-scrollbar overflow-y-auto">
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
        <div className='thumbnail mb-2 mx-2 cursor-pointer' onClick={() => handleMediaClick(mainImage)}>
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
          <div key={index} className='thumbnail mb-2 mx-2 cursor-pointer' onClick={() => handleMediaClick(image)}>
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

      <div className='lg:mb-0 xl:mt-[-15px] mb-[25px] sm:w-full mx-auto h-[380px] w-[320px] sm:h-[340px] md:h-[420px] lg:w-[350px] lg:h-[430px] xl:w-[420px] xl:h-[550px]'>
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
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [key, setKey] = useState(0);

  const [isIncreasing, setisIncreasing] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products/${id}`);
        setProduct(response.data);
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
    const token = localStorage.getItem('token');
    //console.log(token);
    if (token === null) {
      navigate("/login");
    }
    else {
      if (product) {
        dispatch(addToCart({ id: product._id, quantity, size: selectedSize }));
      }
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setisIncreasing(true);
    setKey(prevKey => prevKey + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    setisIncreasing(false);
    setKey(prevKey => prevKey + 1);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    //console.log('Selected size:', size);
  };

  if (!product) return <div className='h-screen w-screen pt-[-96px]'> <MainLoader /></div>;

  const discountedPrice = product.sale
    ? (product.price - (product.price * product.sale) / 100).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className='xsx:pt-[190px] pt-[120px]'>
      <div className='w-[96vw] xl:w-[95vw] lg:px-[0px] px-[6px] mx-auto grid grid-cols-1 lg:grid-cols-11'>
        <div className="col-span-7">
          <MediaCarousel
            mainImage={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}`}
            otherImages={product.otherImages.map(image => `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${image}`)}
          />
        </div>

        <div className='xl:h-screen xsx:pl-[15px] flex flex-col col-span-4'>
          <div className='text-lg  w-[140px] py-[3px] text-center rounded-md text-white bg-red-500'>Sale: <span className='font-bold text-xl'>{product.sale}%</span> <span className='text-sm'>OFF</span></div>

          <h1 className="text-3xl mt-[12px] font-bold">{product.name}</h1>
          <div className='flex my-[20px] items-center'>
            <p className="text-md text-white font-normal bg-gray-600 font-serif w-[140px] py-[3px] text-center rounded-lg">{product.category}</p>
            <p className="text-lg ml-[9px] underline font-bold">{product.subcategory}</p>
          </div>

          <div className="mb-[8px]">
            <p className="text-lg font-medium mb-[8px]">Available Sizes:</p>
            <div className="flex flex-wrap">
              {product.size.map((size, index) => (
                <button
                  key={index}
                  className={`transition duration-200 font-semibold px-4 text-[18px] py-2 m-1 border border-gray-300 rounded-lg ${selectedSize === size ? 'bg-red-800 text-white' : 'bg-gray-100'}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-md mt-[8px] flex items-center font-medium">
            <span className='text-red-700 px-[4px] rounded-lg  bg-red-100'>Available Stock: </span>
            <span className='text-xl ml-[6px] text-red-700'>{product.stock}</span>
          </p>

          <p className="text-xl my-[14px]">
            {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
            <span className='text-2xl ml-[12px] font-semibold'>${discountedPrice}</span>
          </p>


          <p className='text-xl mt-[6px] font-mono'>Quantity</p>
          <div className="flex items-center mt-[5px]">
            <button onClick={handleDecreaseQuantity} className="text-[29.5px] rounded-l-[20px] text-white bg-red-800 w-[55px]">-</button>
            <div className="w-[150px] flex justify-center border border-red-800 mx-[-5px] py-[3px] text-[24px]">
              <motion.span
                key={key}
                initial={{ opacity: 0, y: isIncreasing ? 12 : -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isIncreasing ? -12 : 12 }}
                transition={{ type: "spring", stiffness: 300, duration: 1.2 }}
              >
                {quantity}
              </motion.span>
            </div>
            <button onClick={handleIncreaseQuantity} className="text-[29.5px] rounded-r-[20px] text-white bg-red-800 w-[55px]">+</button>
          </div>

          <button onClick={handleAddToCart} className="flex items-center justify-center w-[220px] mt-[20px] h-[50px] rounded-lg border-none bg-red-700 text-white cursor-pointer transition-transform duration-500 overflow-hidden shadow-md relative group active:bg-[#400f0f]">
            <span className="absolute -left-[45px] w-[40px] h-[40px] bg-transparent rounded-full flex items-center justify-center z-10 transition-transform duration-500 group-hover:translate-x-[80px] group-hover:rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="currentColor" className="text-white">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
              </svg>
            </span>
            <p className="flex items-center justify-center text-white group-hover:translate-x-[10px] text-lg font-semibold transition-transform duration-500">Add to Cart</p>
          </button>
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