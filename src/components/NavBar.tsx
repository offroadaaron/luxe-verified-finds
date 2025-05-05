import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-luxe-black border-b border-gray-200 dark:border-gray-800">
      <div className="luxe-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold">
              <span className="text-luxe-gold">Luxe</span>
              <span className="text-black dark:text-white">Verified</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              All Products
            </Link>
            <Link to="/categories/mens" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              Mens
            </Link>
            <Link to="/categories/womens" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              Womens
            </Link>
            <Link to="/categories/handbags" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              Handbags
            </Link>
            <Link to="/categories/watches" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              Watches
            </Link>
            <Link to="/categories/jewelry" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              Jewelry
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              About Us
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="hover:text-luxe-gold">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="relative hover:text-luxe-gold">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-luxe-gold text-white rounded-full flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-white">
                <User className="h-4 w-4 mr-2" /> Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-luxe-gold"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn("lg:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/products"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            All Products
          </Link>
          <Link
            to="/categories/mens"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            Mens
          </Link>
          <Link
            to="/categories/womens"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            Womens
          </Link>
          <Link
            to="/categories/handbags"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            Handbags
          </Link>
          <Link
            to="/categories/watches"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            Watches
          </Link>
          <Link
            to="/categories/jewelry"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            Jewelry
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <div className="flex items-center justify-between px-3 py-2">
            <button className="hover:text-luxe-gold">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="relative hover:text-luxe-gold" onClick={toggleMenu}>
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-luxe-gold text-white rounded-full flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <Link 
              to="/login" 
              className="text-sm font-medium hover:text-luxe-gold"
              onClick={toggleMenu}
            >
              Login / Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
