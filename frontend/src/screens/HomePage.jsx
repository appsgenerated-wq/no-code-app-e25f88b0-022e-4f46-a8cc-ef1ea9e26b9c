import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { BookOpenIcon, UsersIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
      title: 'Discover Recipes',
      description: 'Explore thousands of recipes from a global community of home cooks. Find your next favorite meal.'
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-blue-600" />,
      title: 'Share Your Creations',
      description: 'Publish your own recipes, share your culinary expertise, and build your reputation as a chef.'
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-blue-600" />,
      title: 'Cook with Confidence',
      description: 'Follow easy, step-by-step instructions with ingredient lists that make cooking a breeze.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Find and Share <span className="text-blue-600">Amazing Recipes</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
              Join FlavorFusion to discover, create, and share your favorite dishes with a community of food lovers.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to={user ? '/dashboard' : '/register'} className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                Get Started
              </Link>
              <a href="#features" className="inline-block bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 border border-gray-200 transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need to Cook</h2>
              <p className="mt-4 text-xl text-gray-600">From inspiration to preparation, we've got you covered.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start cooking?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Create your free account today and join the FlavorFusion family.
            </p>
            <div className="mt-8">
               <Link to={user ? '/dashboard' : '/register'} className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
                Sign Up for Free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
