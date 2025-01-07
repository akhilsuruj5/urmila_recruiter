import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecruiterHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('rtoken');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('rtoken');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/postjob', icon: Briefcase, label: 'Post a Job', requiresAuth: true },
  ];

  return (
    <header className="bg-white shadow-md border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-semibold flex items-center text-gray-800">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Briefcase className="mr-2 text-blue-600" size={28} />
            </motion.div>
            URMILA Recruiter Portal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              (!item.requiresAuth || isLoggedIn) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors ${
                    isActive(item.path) ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  <item.icon className="mr-1" size={18} />
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <LogOut className="mr-1" size={18} />
                Logout
              </motion.button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-4 pb-2 space-y-2">
              {menuItems.map((item) => (
                (!item.requiresAuth || isLoggedIn) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2" size={18} />
                      {item.label}
                    </div>
                  </Link>
                )
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </div>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
