
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxe-charcoal text-white pt-16 pb-8">
      <div className="luxe-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div>
            <Link to="/" className="block mb-6">
              <h1 className="text-2xl font-serif font-bold">
                <span className="text-luxe-gold">Luxe</span>
                <span className="text-white">Verified</span>
              </h1>
            </Link>
            <p className="text-gray-400 mb-6">
              Curated luxury items authenticated by experts and technology for complete peace of mind.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/categories/handbags" className="text-gray-400 hover:text-white">Handbags</Link></li>
              <li><Link to="/categories/watches" className="text-gray-400 hover:text-white">Watches</Link></li>
              <li><Link to="/categories/jewelry" className="text-gray-400 hover:text-white">Jewelry</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-white">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">About</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
              <li><Link to="/authentication" className="text-gray-400 hover:text-white">Authentication</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-white">Sustainability</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Journal</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Luxe Verified Finds. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="PayPal" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="American Express" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
