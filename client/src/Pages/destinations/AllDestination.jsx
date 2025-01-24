import React from "react";
import { AllDestinaitonBanner, AllDestinationCard } from "../../components";
import customFetch from "../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
export const allDestinationLoader = async () => {
  const { data } = await customFetch.get("/destination");
  return { destinations: data };
};
const AllDestination = () => {
  const { destinations } = useLoaderData();
  if(destinations.destinations.length === 0) {
    return (
      <div className="container text-center py-20">
      <h1 className="text-4xl font-bold font-sans mb-4">No Destinaitions Listed Yet</h1>
      <p className="text-lg text-gray-500 mb-8">
        There are currently no Destinaitions available. Please check back later or try refreshing the page.
      </p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
      </div>
    );
}
  return (
    <div className="container my-5">
      <AllDestinaitonBanner
        image="https://www.lpcentre.com/storage/images/articles/16524701910.jpeg"
        title="All Destinations"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.destinations?.map((destination) => (
          <AllDestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default AllDestination;
