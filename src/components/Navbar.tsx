import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Bell, User, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">fatafat</span>
              <span className="text-2xl font-bold text-gray-900">jobs</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for local services..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/become-seller" className="text-gray-700 hover:text-emerald-600">
              Become a Seller
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-2 px-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for local services..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/become-seller"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
              >
                Become a Seller
              </Link>
              <Link
                to="/notifications"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
              >
                Notifications
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;