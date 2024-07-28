import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/fetchproducts/products');
        setProducts(response.data);
        console.log(response.data);
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
    // You can add additional logic here to handle category selection
    console.log(`Selected Category: ${categoryName}`);
  };


  return (
    <div className='overflow-x-hidden'>
      {/* Search filter */}
      <SearchFilter products={filteredProducts} />
      {/* Category filter */}


       
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-medium">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory filter */}
      {selectedCategory !== 'All' && (
        <div className="mb-4">
          <label htmlFor="subcategory" className="block text-lg font-medium">Filter by Subcategory:</label>
          <select
            id="subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="mt-2 p-2 border rounded"
          >
            <option value="All">All Subcategories</option>
            {subcategories.map(subcategory => (
              <option key={subcategory._id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Product list */}
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const discountedPrice = product.sale
            ? (product.price - (product.price * product.sale) / 100).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="block border p-4 rounded-lg shadow-lg cursor-pointer"
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
        })}
      </div>
    </div>
  );
};


export default ProductList;
