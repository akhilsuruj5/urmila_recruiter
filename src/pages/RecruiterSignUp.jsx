import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Building, Phone, AlertCircle } from 'lucide-react';
import RecruiterHeader from '../components/RecruiterHeader';

const InputField = ({ icon, name, type, placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      name={name}
      type={type}
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function RecruiterSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic form validation
    if (!formData.name || !formData.email || !formData.password || !formData.company || !formData.contact) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://urmila-webservice.onrender.com/recruiter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Sign up successful! Please log in.');
        navigate('/login');
      } else {
        setError(data.message || 'An error occurred during sign up');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
  <RecruiterHeader />
  <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-md"
    >
      <div>
        <h2 className="text-center text-3xl font-bold text-gray-800">Recruiter Sign Up</h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          Join us to post jobs and connect with talent.
        </p>
      </div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            icon={<User className="h-5 w-5 text-gray-500" />}
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            icon={<Mail className="h-5 w-5 text-gray-500" />}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-500" />}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            icon={<Building className="h-5 w-5 text-gray-500" />}
            name="company"
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <InputField
            icon={<Phone className="h-5 w-5 text-gray-500" />}
            name="contact"
            type="text"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            'Sign Up'
          )}
        </motion.button>
      </form>
    </motion.div>
  </div>
</div>

  );
}

