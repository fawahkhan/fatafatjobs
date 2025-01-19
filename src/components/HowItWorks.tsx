import React from 'react';
import { Search, MapPin, Calendar, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Services',
    description: 'Browse through various local services and professionals in your area'
  },
  {
    icon: MapPin,
    title: 'Find Nearby',
    description: 'Discover talented professionals right in your neighborhood'
  },
  {
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Schedule services at your convenience with instant booking'
  },
  {
    icon: Star,
    title: 'Rate & Review',
    description: 'Share your experience and help others find great local talent'
  }
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How Fatafat Works</h2>
          <p className="mt-4 text-xl text-gray-600">Find and book local services in just a few steps</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                    <step.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;