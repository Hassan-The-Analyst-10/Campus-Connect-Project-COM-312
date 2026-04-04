import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                Campus<span className="text-green-600">Connect</span>
              </span>
              <span className="text-xs text-gray-500 -mt-1">Student Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              }`}
            >
              Home
            </Link>
            
            {/* Features Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200 flex items-center space-x-1">
                <span>Features</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-56 mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Courses</Link>
                  <Link to="/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Events</Link>
                  <Link to="/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Resources</Link>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/about")
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
              }`}
            >
              About
            </Link>

            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              <Link
                to="/user/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/user/register"
                className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                Courses
              </Link>
              <Link
                to="/events"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                Events
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                About
              </Link>
              <div className="pt-2 space-y-2">
                <Link
                  to="/user/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/user/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-center bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add this to your global CSS or Tailwind config for animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;