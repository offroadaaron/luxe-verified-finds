
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToProducts = (params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value.toString());
    });
    
    const queryString = searchParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
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
            <button 
              onClick={() => navigateToProducts()} 
              className="text-sm font-medium hover:text-luxe-gold transition-colors"
            >
              All Products
            </button>
            <Link to="/about" className="text-sm font-medium hover:text-luxe-gold transition-colors">
              About Us
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-luxe-gold transition-colors">
                Admin Dashboard
              </Link>
            )}
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
            {user ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={handleSignOut} className="hover:text-luxe-gold">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-white">
                  <User className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
            )}
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
          <button
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold w-full text-left"
            onClick={() => navigateToProducts()}
          >
            All Products
          </button>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-luxe-gold"
              onClick={toggleMenu}
            >
              Admin Dashboard
            </Link>
          )}
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
            {user ? (
              <button 
                onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}
                className="text-sm font-medium hover:text-luxe-gold flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="text-sm font-medium hover:text-luxe-gold"
                onClick={toggleMenu}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
