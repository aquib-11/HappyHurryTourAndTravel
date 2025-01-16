import { useOutletContext } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { useEffect, useState } from "react";
import { AllDestinationCard, AllHotelsCard } from "../../components";

const PackageMore = () => {
  const _package = useOutletContext();
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);

  const fetchDestinations = async () => {
    const { data } = await customFetch.get("/destination");
    console.log(data)
    setDestinations(data.destinations);
  };
  const fetchHotels = async () => {
    const { data } = await customFetch.get("/hotel");
    setHotels(data.hotels);
  }
  useEffect(() => {
    fetchDestinations();
    fetchHotels();
  }, [_package]);

  const filteredDestinations = destinations.filter(destination => _package.destinations.includes(destination._id));
  const filteredHotels = hotels.filter(hotel => _package.hotels.includes(hotel._id));
  console.log({ filteredDestinations, filteredHotels });
  return (
    <div>
      <h2 className="font-sans font-semibold text-[var(--bs-white)] mb-4">Destinations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredDestinations.map((destination, index) => (
                    <AllDestinationCard key={destination._id} destination={destination} />

        ))}
      </div>
      <h2 className="font-sans font-semibold text-[var(--bs-white)] mb-4">Hotels</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredHotels.map((hotel, index) => (
          <AllHotelsCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}
export default PackageMore
