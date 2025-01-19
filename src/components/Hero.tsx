import React from 'react';
import { MapPin, Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white">
            Find Local Talent
            <span className="block">In Your Neighborhood</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-sm sm:text-base md:text-lg text-white md:mt-5 md:max-w-3xl">
            Discover skilled professionals in your area for quick, reliable services. From home repairs to tutoring - all services just around the corner.
          </p>
          
          <div className="mt-8 sm:mt-10 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full sm:w-48 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500"
                />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <button className="w-full sm:w-auto px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;