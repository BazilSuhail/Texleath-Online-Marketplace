import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdSearch } from "react-icons/io";

const SearchFilter = ({ products }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products whenever the searchTerm changes
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIconClick = () => {
    setIsFocused(!isFocused);
  };
  return (
    <div className='mb-[35px]'>
      <div className="my-[15px] px-[5px] lg:px-[15px] flex mx-auto">
        <IoMdSearch
          onClick={handleIconClick}
          className="text-[45px] border-2 border-red-700 rounded-full text-red-700 p-[3px] mr-[18px] cursor-pointer"
        />
        <motion.input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by product name"
          className={` border-2 border-white placeholder:text-red-900 rounded-lg p-2 ${isFocused ? 'border-red-500 bg-red-100' : 'bg-white'}`}
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.6 }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {isFocused &&

        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
          <div className="mx-auto my-[45px] grid grid-cols-2 overflow-hidden lg:grid-cols-3 xl:grid-cols-4 ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const discountedPrice = product.sale
                  ? (product.price - (product.price * product.sale) / 100).toFixed(2)
                  : product.price.toFixed(2);

                return (
                  <div
                    key={product._id}
                    className="block p-[10px] overflow-x-hidden sm:p-[5px] cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                      alt={product.name}
                      className="object-cover mx-auto h-[200px] w-[180px] hover:scale-105 transition duration-700  md:h-[400px] md:w-[340px] lg:w-[300px]  lg:h-[335px] sm:h-[320px] sm:w-[280px] mb-4"
                    />

                    <div className='mx-auto w-[180px] md:w-[340px] lg:w-[300px] sm:w-[280px] '>

                      <h1 className='text-xl md:text-[25px] lg:text-[25px] mb-[6px] text-red-900 font-medium'>
                        {product.name.length > 22 ? `${product.name.substring(0, 22)}...` : product.name}
                      </h1>
                      
                      <div className='md:mt-[10px] mt-[0px] inline-block'>
                        <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-gray-600 text-white">{product.category}</p>
                      </div>

                      <div className='ml-[8px] inline-block'>
                        <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-custom-gray">{product.subcategory}</p>
                      </div>

                      <p className="my-[5px] flex justify-between items-center">
                        {product.sale && <span className="text-red-500 bg-red-200 font-medium rounded-xl text-sm md:text-md px-[12px] line-through">Rs.{product.price.toFixed(2)}</span>}
                        <span className='text-[22px] ml-[6px] mb-[3px] font-medium'><span className='text-[20px] font-normal'> Rs.</span>{parseInt(discountedPrice)}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      }

      {/* Filtered products display */}

    </div >
  );
};


const ProductList = () => {
  const navigate = useNavigate();

  const { category: urlCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  useEffect(() => {
    //console.log("Hey I RAN !!!");
    setSelectedCategory(urlCategory);
    console.log(urlCategory);
  }, [urlCategory]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fetchproducts/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/subcategories`);
        const filteredSubcategories = response.data.filter(subcat => subcat.category === selectedCategory);
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  // Filter products based on selected category and subcategory
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
    return matchesCategory && matchesSubcategory;
  });


  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
  };
  const excludedCategories = ['Fitness Wear', 'Sports Wear', 'Gym Wear'];
  return (
    <div className='overflow-x-hidden'>
      {/* Search filter */}
      <SearchFilter products={filteredProducts} />

      {/* Category filter */}
      <div className="my-[4px] ml-[7px] lg:ml-[25px]">
        <div className="mt-2 flex text-sm sm:text-md  md:text-lg w-[100%] overflow-x-auto font-medium text-red-900 whitespace-nowrap gap-2">
          <div onClick={() => handleCategoryClick('All')} className={`px-[12px] py-[3px]  cursor-pointer rounded ${selectedCategory === 'All' ? 'bg-red-900 text-white' : 'bg-red-100 '}`}>
            All Categories
          </div>

          <div onClick={() => handleCategoryClick('Sports Wear')} className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedCategory === 'Sports Wear' ? 'bg-red-900 text-white' : 'bg-red-100'}`} >
            Sports Wear
          </div>
          <div onClick={() => handleCategoryClick('Fitness Wear')} className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedCategory === 'Fitness Wear' ? 'bg-red-900 text-white' : 'bg-red-100'}`} >
            Fitness Wear
          </div>
          <div onClick={() => handleCategoryClick('Gym Wear')} className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedCategory === 'Gym Wear' ? 'bg-red-900 text-white' : 'bg-red-100'}`} >
            Gym Wear
          </div>

          {categories
            .filter(category => !excludedCategories.includes(category.name)) // Filter out excluded categories
            .map(category => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedCategory === category.name ? 'bg-red-900 text-white' : 'bg-red-100'}`}
              >
                {category.name}
              </div>
            ))
          }
        </div>
      </div>

      {selectedCategory !== 'All' && (
        <div className="my-4 ml-[7px] lg:ml-[25px] ">
          <div className="mt-2 flex text-sm sm:text-md lg:text-lg font-medium text-red-900 flex-wrap gap-2">
            <div
              onClick={() => handleSubcategoryClick('All')}
              className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedSubcategory === 'All' ? 'bg-red-900 text-white' : 'bg-red-100'}`}
            >
              All Subcategories
            </div>
            {subcategories.map(subcategory => (
              <div
                key={subcategory._id}
                onClick={() => handleSubcategoryClick(subcategory.name)}
                className={`px-[12px] py-[3px] cursor-pointer rounded ${selectedSubcategory === subcategory.name ? 'bg-red-900 text-white' : 'bg-red-100'}`}
              >
                {subcategory.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="mx-auto my-[45px] grid grid-cols-2 overflow-hidden lg:grid-cols-3 xl:grid-cols-4 ">
        {filteredProducts.map((product) => {
          const discountedPrice = product.sale
            ? (product.price - (product.price * product.sale) / 100).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="block p-[10px] overflow-x-hidden sm:p-[5px] cursor-pointer"
            >
              <img
                loading='lazy'
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                alt={product.name}
                className="object-cover mx-auto h-[200px] w-[180px] hover:scale-105 transition duration-700  md:h-[400px] md:w-[340px] lg:w-[300px]  lg:h-[335px] sm:h-[320px] sm:w-[280px] mb-4"
              />
              <div className='mx-auto w-[180px] md:w-[340px] lg:w-[300px] sm:w-[280px] '>

                <h1 className='text-xl md:text-[25px] lg:text-[25px] mb-[6px] text-red-900 font-medium'>
                  {product.name.length > 22 ? `${product.name.substring(0, 22)}...` : product.name}
                </h1>

                <div className='md:mt-[10px] mt-[0px] inline-block'>
                  <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-gray-600 text-white">{product.category}</p>
                </div>

                <div className='ml-[8px] inline-block'>
                  <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-custom-gray">{product.subcategory}</p>
                </div>

                <p className="my-[5px] flex justify-between items-center">
                  {product.sale && <span className="text-red-500 bg-red-200 font-medium rounded-xl text-sm md:text-md px-[12px] line-through">Rs.{product.price.toFixed(2)}</span>}
                  <span className='text-[22px] ml-[6px] mb-[3px] font-medium'><span className='text-[20px] font-normal'> Rs.</span>{parseInt(discountedPrice)}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default ProductList;
