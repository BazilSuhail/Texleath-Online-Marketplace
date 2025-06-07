import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiMenu,
  FiX,
} from "react-icons/fi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { addToCart } from "../redux/cartSlice"
import MainLoader from "./Pages/mainLoader"
import ReviewProduct from "./ProductReview"


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

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-900",
    destructive: "bg-red-500 text-white",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

const Select = ({ children, value, onValueChange, placeholder, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`flex w-full h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${className}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  )
}

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}

export default function ProductDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [key, setKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0)

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
      console.log(id)
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products/${id}`
      );
      const productData = response.data;
      //console.log('Fetched Product Data:', productData);

      const mainImage = productData.image;
      let modifiedOtherImages = productData.otherImages || [];
      modifiedOtherImages = modifiedOtherImages.filter(img => img !== mainImage);

      // Push main image at index 0
      modifiedOtherImages.unshift(mainImage);

      // Log the updated array
      //console.log('Updated otherImages with main image first:', modifiedOtherImages);

      setProduct({
        ...productData,
        otherImages: modifiedOtherImages,
      });

      if (productData.size?.length > 0) {
        setSelectedSize(productData.size[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  fetchProduct();
}, [id]);


  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
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
    
  };

  if (!product) return <div className='h-screen w-screen pt-[-96px]'> <MainLoader /></div>;

  const discountedPrice = product.sale
    ? (product.price - (product.price * product.sale) / 100).toFixed(2)
    : product.price.toFixed(2);

  // ===============================

  // const [selectedImage, setSelectedImage] = useState(0)
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState("")
  // const [quantity, setQuantity] = useState(1)
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" })
  // const [showReviewForm, setShowReviewForm] = useState(false)

  // const handleAddToCart = () => {
  //   if (!selectedSize) {
  //     alert("Please select a size")
  //     return
  //   }
  //   alert("Added to cart!")
  // }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    console.log("New review:", newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, comment: "", name: "" })
  }

  return (
    
    <main className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Breadcrumb */}
      <section className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-900">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative lg:aspect-square bg-gray-50 w-full rounded-lg overflow-hidden"
          >
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.otherImages[selectedImage]}` || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-[550px] sm:h-full sm:object-fit"
            />
            <button
              onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.otherImages.length - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedImage(selectedImage < product.otherImages.length - 1 ? selectedImage + 1 : 0)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            {product.otherImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <img
              src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${image}` || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.price > discountedPrice && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.price > discountedPrice && (
                <span className="text-xl text-gray-500 line-through">Rs. {discountedPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description.length > 15
                ?
                product.description
                :
                'Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this shirt offers exceptional softness and breathability. Perfect for everyday wear, it features a classic fit that flatters all body types.'
              }
            </p>
          </motion.div>

          {/* Product Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Size Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Size</Label>
              <Select
                value={selectedSize}
                onValueChange={setSelectedSize}
                placeholder="Select a size"
                className="w-full"
              >
                {product.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-medium mb-3 block">Quantity</Label>
              <div className="flex items-center space-x-3">
                <button
                onClick={handleDecreaseQuantity}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FiMinus className="w-4 h-4" />
                </button> 

                  <motion.span
                                key={key}
                                initial={{ opacity: 0, y: isIncreasing ? 12 : -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: isIncreasing ? -12 : 12 }}
                                transition={{ type: "spring", stiffness: 300, duration: 1.2 }}
                                className="text-lg font-medium w-8 text-center"
                              >
                                {quantity}
                              </motion.span>
                <button
                onClick={handleIncreaseQuantity}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{product.stock} items in stock</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex w-[280px] bg-black hover:bg-gray-800 text-white" size="lg">
                <FiShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <FiShare2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}

      <ReviewProduct productId={id} />
      {/*
 <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <div className="border-t border-gray-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <Button onClick={() => setShowReviewForm(!showReviewForm)} variant="outline">
              Write a Review
            </Button>
          </div>

           <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <Label htmlFor="reviewer-name">Your Name</Label>
                  <Input
                    id="reviewer-name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <FiStar
                          className={`w-6 h-6 ${star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review-comment">Your Review</Label>
                  <Textarea
                    id="review-comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-black hover:bg-gray-800">
                    Submit Review
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>

            
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
*/}

    </main>
  )
}
