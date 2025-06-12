import { motion } from "framer-motion"
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiSend,
} from "react-icons/fi" 
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"


const FooterLink = ({ href, children, external = false, className = "" }) => {
  const linkClasses = `text-gray-600 hover:text-red-600 transition-all duration-300 text-sm font-medium group ${className}`

  if (external) {
    return (
      <a to={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={linkClasses}>
      {children}
    </Link>
  )
}

const SocialIcon = ({ href, icon: Icon, label, className = "" }) => {
  return (
    <motion.a
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}


export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/categories/clothing", label: "Clothing" },
    { href: "/categories/accessories", label: "Accessories" },
    { href: "/sale", label: "Sale" },
  ]

  const support = [
    { href: "/contact", label: "Contact Us" },
    { href: "/help", label: "Help Center" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
    { href: "/size-guide", label: "Size Guide" },
  ]

  const company = [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/blog", label: "Blog" },
    { href: "/press", label: "Press" },
  ]

  const features = [
    {
      icon: FiShield,
      title: "Secure Shopping",
      description: "Your data is protected with industry-standard encryption",
    },
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Free delivery on orders over $100 worldwide",
    },
    {
      icon: FiRefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 bg-red-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gray-200 rounded-full opacity-40"></div>
      </div>

   
      {/* Newsletter Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pt-16"> 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Stay <span className="text-red-600">Connected</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto lg:pr-[85px]">
                Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
              </p>
              <p className="text-xs text-gray-500">Join 50,000+ fashion enthusiasts. Unsubscribe anytime.</p>
              </div>

              <div className="w-full sm:mt-0 mt-[15px] flex gap-x-2 sm:flex-col lg:px-[35px]">
                <input 
                type="email" 
                placeholder="Enter your email address" 
                   className='flex h-12 w-full sm:w-[280px] ml-auto rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-red-500 transition-all duration-300 '
                 />
                <div className="mt-[15px]"></div>
                <button className="px- 6 text-[16px] font-[600] py-2 bg-red-600 rounded-[12px] ml-auto w-full sm:w-[280px] justify-center text-white flex items-center">
                  <FiSend className="w-4 h-4 mr-2" />
                  Subscribe
                </button>
              </div>
            </motion.div> 
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Link to="/" className="flex items-center ">
                    <img src={"/logo.png"} alt="Poor Connection" className="w-[55px] h-[55px]" />
                                 
                  <span className="text-2xl font-bold ml-[8px] text-red-700">DiObral</span> 
                </Link>
                <p className="text-gray-600 leading-relaxed max-w-md">
                  Your destination for premium fashion and lifestyle products. We curate the finest collections to help
                  you express your unique style with confidence.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-3 text-red-500" />
                    <span className="text-sm">123 Fashion Street, Style City, SC 12345</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-4 h-4 mr-3 text-red-500" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-4 h-4 mr-3 text-red-500" />
                    <span className="text-sm">hello@diobral.com</span>
                  </div>
                </div>
              </motion.div>
            </div>

           <div className="col-span-3 pl-4 mdLpl-0 grid grid-cols-3">
             {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Shop</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink to={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support</h3>
              <ul className="space-y-4">
                {support.map((link) => (
                  <li key={link.href}>
                    <FooterLink to={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
              <ul className="space-y-4">
                {company.map((link) => (
                  <li key={link.href}>
                    <FooterLink to={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
           </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              <span className="text-gray-600 text-sm font-medium">Follow Us:</span>
              <div className="flex space-x-3">
                <SocialIcon to="https://twitter.com" icon={FaTwitter} label="Twitter" />
                <SocialIcon to="https://youtube.com" icon={FaYoutube} label="YouTube" /> 
                <SocialIcon to="https://facebook.com" icon={FaFacebook} label="Facebook" />
                <SocialIcon to="https://instagram.com" icon={FaInstagram} label="Instagram" />
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-6"
            >
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookies</FooterLink>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-right"
            >
              <p className="text-gray-600 text-sm">© {currentYear} <span className="text-red-700 font-[500]">DiObral</span>. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center lg:justify-end">
                Made with <FiHeart className="inline w-3 h-3 text-red-500 mx-1" /> for fashion lovers
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}