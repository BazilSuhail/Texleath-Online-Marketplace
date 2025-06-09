import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FiSearch, FiFilter, FiGrid, FiList, FiStar, FiShoppingBag, FiMenu, FiX } from "react-icons/fi"
import axios from "axios"
import Button from "../utilities/Button"
import Badge from "../utilities/Badge"

// Custom Components
// const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

//   const variants = {
//     primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
//     outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
//     secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
//   }

//   const sizes = {
//     sm: "px-3 py-2 text-sm rounded-md",
//     md: "px-4 py-2 text-sm rounded-md",
//     lg: "px-6 py-3 text-base rounded-lg",
//   }

//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

//   return (
//     <button className={classes} {...props}>
//       {children}
//     </button>
//   )
// }

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

// const Badge = ({ children, variant = "default", className = "" }) => {
//   const variants = {
//     default: "bg-black text-white",
//     secondary: "bg-gray-100 text-gray-900",
//     destructive: "bg-red-500 text-white",
//   }

//   return (
//     <span
//       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
//     >
//       {children}
//     </span>
//   )
// }

const Select = ({ children, value, onValueChange, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${className}`}
    >
      {children}
    </select>
  )
}

const Checkbox = ({ id, checked, onCheckedChange, className = "" }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`h-4 w-4 text-black focus:ring-gray-500 border-gray-300 rounded ${className}`}
    />
  )
}

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}

const Slider = ({ value, onValueChange, max, step, className = "" }) => {
  return (
    <input
      type="range"
      min="0"
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number.parseInt(e.target.value), value[1]])}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  )
}

export default function Products() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [priceRange, setPriceRange] = useState([500, 10000])
  const [sortBy, setSortBy] = useState("featured")


  // Fetch products, categories, and subcategories once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingProducts(true);
      try {
        const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/fetchproducts/products`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/category`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/subcategories`)
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        //setSubcategories(subcategoriesRes.data);

        // Transforming data
        const structuredCategories = categoriesRes.data.map(category => {
          const matchingSubcategories = subcategoriesRes.data
            .filter(subcat => subcat.category === category.name)
            .map(subcat => subcat.name);

          return {
            name: category.name,
            subcategories: matchingSubcategories
          };
        });

        //console.log(productsRes.data); // This is your final result format
        setCategories(structuredCategories)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingProducts(false);
    };

    fetchInitialData();
    window.scrollTo(0, 0);
  }, []);




  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesSubcategory =
        selectedSubcategories.length === 0 || selectedCategories.length === 0 || selectedSubcategories.includes(product.subcategory);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategories, selectedSubcategories, priceRange, sortBy]);

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleSubcategoryChange = (subcategory, checked) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    } else {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[22px] lg:text-[30px] font-bold text-gray-900">All <span className="text-red-700">Products</span></h1>
          <p className="text-gray-600">Discover our complete collection of premium fashion and lifestyle products.</p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy} className="w-48">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "red" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <FiGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "red" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <FiList className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="lg:hidden">
              <FiFilter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${isFilterOpen ? "block" : "hidden"} lg:block w-full lg:w-64 space-y-6`}>
            <div className="bg-white border-[2px] border-gray-100 shadow-sm rounded-[14px] p-6 ">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => handleCategoryChange(category.name, checked)}
                      />
                      <Label htmlFor={category.name} className="text-sm font-medium">
                        {category.name}
                      </Label>
                    </div>
                    {selectedCategories.includes(category.name) && (
                      <div className="ml-6 mt-2 space-y-2">
                        {category.subcategories.map((sub) => (
                          <div key={sub} className="flex items-center space-x-2">
                            <Checkbox
                              id={sub}
                              checked={selectedSubcategories.includes(sub)}
                              onCheckedChange={(checked) => handleSubcategoryChange(sub, checked)}
                            />
                            <Label htmlFor={sub} className="text-sm text-gray-600">
                              {sub}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-[2px] border-gray-100 shadow-sm rounded-[14px] p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
                        <div className="relative">
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}` || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-64 object-cover  group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.originalPrice > product.price && (
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Sale</Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 p-4"
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="flex gap-4">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/uploads/${product.image}` || "/placeholder.svg"}
                          alt={product.name}
                          className="w-[120px] border-[2px] border-gray-200 rounded-[14px] rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center my-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {product.category} • {product.subcategory}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                    setSelectedSubcategories([])
                    setPriceRange([0, 500])
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}