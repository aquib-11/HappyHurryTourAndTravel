import React, { useEffect, useState } from 'react';
import customFetch from "../../utils/customFetch";
import { Link } from 'react-router-dom';


const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {  
      const { data } = await customFetch.get("/hotel");
      setHotels(data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);
  console.log({hotels})

  return (
    <div className="container ">
      <h1 className="font-sans font-bold text-white mb-8 text-center">Featured Hotels</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={hotel?.images[0]?.image}
                alt={hotel?.name}
                className="w-full h-72 object-cover"
              />
            </div>
            
            <div className="mt-3">
              <Link to={`/hotel/${hotel?._id}`} className="text-xl font-semibold font-sans text-white">{hotel?.name}</Link>
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