import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Products from "./Pages/Products.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx"; 
import Orders from "./Pages/Orders.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Profile from "./Pages/Profile.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";


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