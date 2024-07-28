import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import ProductDetails from "./Components/ProductDetails";
import ProductList from "./Components/ProductList";
import Login from "./Components/LoginUser";
import Register from "./Components/RegisterUser";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import OrderList from "./Components/PLaceOrder";
import ShowOrders from "./Components/ShowOrder";
import ReviewProduct from "./Components/ProductReview";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route exact path="/" element={<Dashboard />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/reviews/:productId" element={<ReviewProduct />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<OrderList />} />
        <Route path="/orders-tracking" element={<ShowOrders />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;