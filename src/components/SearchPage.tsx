import React, { useState } from 'react';
import { Sliders, MapPin, Star, ChevronDown } from 'lucide-react';

const mockServices = [
  {
    id: 1,
    title: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    rating: 4.8,
    reviews: 156,
    price: '$25/hr',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    location: '2.3 miles away'
  },
  {
    id: 2,
    title: 'Expert Plumbing Services',
    provider: 'Mike Smith',
    rating: 4.9,
    reviews: 203,
    price: '$45/hr',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=400',
    location: '1.5 miles away'
  },
  {
    id: 3,
    title: 'Personal Fitness Training',
    provider: 'Emily Davis',
    rating: 5.0,
    reviews: 89,
    price: '$35/hr',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
    location: '0.8 miles away'
  }
];

const SearchPage = () => {
  const [filters, setFilters] = useState({
    price: 'all',
    rating: 'all',
    distance: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full px-4 py-2 bg-white rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center">
              <Sliders className="h-5 w-5 text-gray-500 mr-2" />
              <span>Filters</span>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white p-4 rounded-lg shadow-sm`}>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filters.price}
                  onChange={(e) => setFilters({...filters, price: e.target.value})}
                >
                  <option value="all">All Prices</option>
                  <option value="0-25">$0 - $25/hr</option>
                  <option value="25-50">$25 - $50/hr</option>
                  <option value="50+">$50+/hr</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Rating</h4>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4+">4+ Stars</option>
                  <option value="3+">3+ Stars</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Distance</h4>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filters.distance}
                  onChange={(e) => setFilters({...filters, distance: e.target.value})}
                >
                  <option value="all">Any Distance</option>
                  <option value="1">Within 1 mile</option>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4">
              {mockServices.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.title}</h3>
                          <p className="text-gray-600">{service.provider}</p>
                        </div>
                        <p className="text-xl font-bold text-emerald-600 mt-2 sm:mt-0">{service.price}</p>
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{service.rating}</span>
                        <span className="text-gray-500">({service.reviews} reviews)</span>
                      </div>
                      
                      <div className="mt-4 flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{service.location}</span>
                      </div>
                      
                      <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;