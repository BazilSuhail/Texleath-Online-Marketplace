import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => {
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
              className="w-300 h-300 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-lg text-gray-700">
              ${discountedPrice} {product.sale && <span className="text-red-500 line-through">${product.price.toFixed(2)}</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
