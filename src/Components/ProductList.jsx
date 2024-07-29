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
    <div>
      <div className="my-[15px] px-[15px] flex mx-auto">
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
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const discountedPrice = product.sale
                  ? (product.price - (product.price * product.sale) / 100).toFixed(2)
                  : product.price.toFixed(2);

                return (
                  <div
                    key={product._id}
                    className="block border p-4 rounded-lg shadow-lg cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={`http://localhost:3001/uploads/${product.image}`}
                      alt={product.name}
                      className="w-300 h-300 object-cover w-[200px] h-[200px] mb-4"
                    />
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <h2 className="text-xl font-bold">{product.category}</h2>
                    <h2 className="text-xl font-bold">{product.subcategory}</h2>
                    <p className="text-lg text-gray-700">
                      ${discountedPrice} {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
                    </p>
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

  function onMountFunction() {
    console.log("Hey I RAN !!!");
    setSelectedCategory(urlCategory);
    console.log(urlCategory);
  }

  useEffect(() => {
    onMountFunction();
  }, [urlCategory]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/fetchproducts/products');
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
        const response = await axios.get('http://localhost:3001/api/category');
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
        const response = await axios.get('http://localhost:3001/api/subcategories');
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
      <div className="mb-4">
        <label className="block text-lg font-medium">Filter by Category:</label>
        <div className="mt-2 flex flex-wrap gap-2">
          <div onClick={() => handleCategoryClick('All')} className={`p-2 cursor-pointer border rounded ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
            All Categories
          </div>

          <div onClick={() => handleCategoryClick('Sports Wear')} className={`p-2 cursor-pointer border rounded ${selectedCategory === 'Sports Wear' ? 'bg-blue-500 text-white' : 'bg-white'}`} >
            Sports Wear
          </div>
          <div onClick={() => handleCategoryClick('Fitness Wear')} className={`p-2 cursor-pointer border rounded ${selectedCategory === 'Fitness Wear' ? 'bg-blue-500 text-white' : 'bg-white'}`} >
            Fitness Wear
          </div>
          <div onClick={() => handleCategoryClick('Gym Wear')} className={`p-2 cursor-pointer border rounded ${selectedCategory === 'Gym Wear' ? 'bg-blue-500 text-white' : 'bg-white'}`} >
            Gym Wear
          </div>

          {categories
            .filter(category => !excludedCategories.includes(category.name)) // Filter out excluded categories
            .map(category => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-2 cursor-pointer border rounded ${selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {category.name}
              </div>
            ))
          }
        </div>
      </div>

      {selectedCategory !== 'All' && (
        <div className="mb-4">
          <label className="block text-lg font-medium">Filter by Subcategory:</label>
          <div className="mt-2 flex flex-wrap gap-2">
            <div
              onClick={() => handleSubcategoryClick('All')}
              className={`p-2 cursor-pointer border rounded ${selectedSubcategory === 'All' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              All Subcategories
            </div>
            {subcategories.map(subcategory => (
              <div
                key={subcategory._id}
                onClick={() => handleSubcategoryClick(subcategory.name)}
                className={`p-2 cursor-pointer border rounded ${selectedSubcategory === subcategory.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {subcategory.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="mx-auto grid grid-cols-2 overflow-hidden lg:grid-cols-3 xl:grid-cols-4 ">
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
                src={`http://localhost:3001/uploads/${product.image}`}
                alt={product.name}
                className="object-cover mx-auto h-[200px] w-[180px] hover:scale-105 transition duration-700  md:h-[400px] md:w-[340px] lg:w-[300px]  lg:h-[335px] sm:h-[320px] sm:w-[280px] mb-4"
              />
              <div className='mx-auto w-[180px] md:w-[340px] lg:w-[300px] sm:w-[280px] '>

                <h1 className='text-xl md:text-[25px] lg:text-[30px] mb-[6px]  font-medium'>{product.name}</h1>

                <div className='md:mt-[10px] mt-[0px] inline-block'>
                  <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-gray-600 text-white">{product.category}</p>
                </div>

                <div className='ml-[8px] inline-block'>
                  <p className="text-[10px] md:text-[13px] font-medium px-[10px] py-[2px] rounded-xl bg-custom-gray">{product.subcategory}</p>
                </div>

                <p className="my-[5px] flex justify-between items-center">
                  {product.sale && <span className="text-red-500 bg-red-200 font-medium rounded-xl text-sm md:text-md px-[12px] line-through">Rs.{product.price.toFixed(2)}</span>}
                  <span className='text-2xl lg:text-3xl ml-[6px] mb-[3px] font-medium'><span className='text-[20px] font-normal'> Rs.</span>{parseInt(discountedPrice)}</span>
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
