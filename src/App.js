import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import ProductDetails from "./Components/ProductDetails";
import ProductList from "./Components/ProductList";
import Login from "./Components/authentication/LoginUser";
import Register from "./Components/authentication/RegisterUser";
import Profile from "./Components/authentication/Profile";
import Cart from "./Components/Cart";
import OrderList from "./Components/PlaceOrder";
import ShowOrders from "./Components/ShowOrder";
import ReviewProduct from "./Components/ProductReview";
import Footer from "./Components/Footer";
import FAQPage from "./Components/Pages/Faq";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import TermsOfService from "./Components/Pages/TermOfService";
import CustomerSupport from "./Components/Pages/CustomerSupport";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route exact path="/" element={<Dashboard />} />

        {/*  <Route path="/productlist" element={<ProductList  />} /> */}
        <Route path="/productlist/:category?/:subcategory?" element={<ProductList />} />


        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/reviews/:productId" element={<ReviewProduct />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<OrderList />} />
        <Route path="/orders-tracking" element={<ShowOrders />} />

        <Route path="/faqs" element={<FAQPage />} />

        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsOfService" element={<TermsOfService />} />
        <Route path="/customerSupport" element={<CustomerSupport />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;