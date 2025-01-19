import React from 'react';

const services = [
  {
    id: 1,
    title: 'Home Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    category: 'Home Services'
  },
  {
    id: 2,
    title: 'Plumbing',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=400',
    category: 'Repairs'
  },
  {
    id: 3,
    title: 'Personal Training',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
    category: 'Fitness'
  },
  {
    id: 4,
    title: 'Math Tutoring',
    image: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&q=80&w=400',
    category: 'Education'
  },
  {
    id: 5,
    title: 'Gardening',
    image: 'https://images.unsplash.com/photo-1599629954294-16b394a8ba35?auto=format&fit=crop&q=80&w=400',
    category: 'Outdoor'
  },
  {
    id: 6,
    title: 'Pet Care',
    image: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&q=80&w=400',
    category: 'Pet Services'
  }
];

const PopularServices = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Popular Local Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-sm sm:text-base text-emerald-300">{service.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularServices