import React from 'react';

const FeaturedHotels = () => {
  const hotels = [
    {
      name: 'Baga Comfort',
      location: 'New York',
      price: 455,
      startingAt: 455,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      name: 'New Apollo Hotel',
      location: 'California',
      price: 585,
      startingAt: 585,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      name: 'New Age Hotel',
      location: 'Los Angeles',
      price: 385,
      startingAt: 385,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      name: 'Helios Beach Resort',
      location: 'Chicago',
      price: 665,
      startingAt: 665,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
  ];

  return (
    <div className="container ">
      <h1 className="font-sans font-bold text-white mb-8 text-center">Featured Hotels</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-72 object-cover"
              />
            </div>
            
            <div className="mt-3">
              <h3 className="text-xl font-semibold font-sans text-white">{hotel.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="text-emerald-400 font-medium">₨: {hotel.price}</span>
                  <span className="text-gray-400 text-sm ml-1">/starting at</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotels;