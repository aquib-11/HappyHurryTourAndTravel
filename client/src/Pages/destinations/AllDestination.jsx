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
  const randomImages = destinations?.destinations
    ?.map((destination) => destination.images[0]?.image)
    .filter((image) => image !== null && image !== "" && image !== undefined);
  return (
    <div className="container my-5">
      <AllDestinaitonBanner randomImages={randomImages} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.destinations?.map((destination) => (
          <AllDestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default AllDestination;
