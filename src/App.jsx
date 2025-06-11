import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./Pages/home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout"; 
import Orders from "./Pages/Orders";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
{/* 
        <Route path="/faqs" element={<FAQPage />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsOfService" element={<TermsOfService />} />
        <Route path="/customerSupport" element={<CustomerSupport />} /> */}

        <Route path="/productlist/:category?/:subcategory?" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* <Route path="/reviews/:productId" element={<ReviewProduct />} /> */}

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders-tracking" element={<Orders />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;