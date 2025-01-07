import React from 'react';
import { Link } from 'react-router-dom';  // for navigation
import { FaRegCheckCircle, FaUsers, FaHeadset } from 'react-icons/fa';  // lucid react icons
import RecruiterHeader from '../components/RecruiterHeader';

const RecruiterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <RecruiterHeader />

      {/* Hero Section */}
      <header className="relative bg-gray-800 text-white">
        <div className="absolute inset-0 bg-opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('')" }}></div>
        <div className="relative max-w-7xl mx-auto py-16 px-6 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold mb-4">Streamline Your Hiring Process</h1>
          <p className="text-lg text-gray-300 mb-6">
            Manage postings, track applications, and discover the best talent to grow your team.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link to="/signup">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
            <a href="https://urmila.acdemy/contactus">
              <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <FaRegCheckCircle className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-700">Ease of Use</h3>
              <p className="text-gray-600">
                Manage your hiring needs effortlessly with a user-friendly dashboard.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <FaUsers className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-700">Access Top Talent</h3>
              <p className="text-gray-600">
                Reach a diverse pool of qualified candidates in no time.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <FaHeadset className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-700">24/7 Support</h3>
              <p className="text-gray-600">
                Get dedicated assistance whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Platform Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Comprehensive Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Get a complete overview of your hiring activities in one place. Track job postings, view applications, and manage candidates efficiently.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                Explore Dashboard
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">
                Use powerful analytics to make data-driven recruitment decisions and improve your hiring process.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What Recruiters Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "This platform has made hiring a breeze! The intuitive interface and strong candidate pool are unmatched."
              </p>
              <p className="text-sm font-semibold text-gray-700">- Alex Johnson, HR Manager</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "A game-changer for our recruitment process. Highly recommend it to anyone looking to scale their team."
              </p>
              <p className="text-sm font-semibold text-gray-700">- Priya Sharma, Talent Acquisition Lead</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "The analytics and reporting tools have helped us make informed decisions quickly. Love it!"
              </p>
              <p className="text-sm font-semibold text-gray-700">- John Smith, CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-gray-300 mb-6">
            Sign up today and start building your dream team with ease.
          </p>
          <Link to="/signup">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recruiter Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default RecruiterPage;
