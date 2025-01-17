import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";
import { AllDestinationCard, AllHotelsCard } from "../../components";

const PackageMore = () => {
  const _package = useOutletContext();
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);

  const fetchDestinations = async () => {
    const { data } = await customFetch.get("/destination");
    setDestinations(data.destinations);
  };

  const fetchHotels = async () => {
    const { data } = await customFetch.get("/hotel");
    setHotels(data.hotels);
  };

  useEffect(() => {
    fetchDestinations();
    fetchHotels();
  }, [_package]);

  const filteredDestinations = destinations.filter((destination) =>
    _package.destinations.includes(destination._id)
  );

  const filteredHotels = hotels.filter((hotel) =>
    _package.hotels.includes(hotel._id)
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Destinations Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">
            Featured Destinations
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="w-[200px]">
            {filteredDestinations.map((destination) => (
              <AllDestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hotels Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">Featured Hotels</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <AllHotelsCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageMore;
