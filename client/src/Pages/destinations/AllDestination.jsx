import React from "react";
import { AllDestinaitonBanner, AllDestinationCard } from "../../components";
const AllDestination = () => {
  return (
    <div className="container my-5">
      <AllDestinaitonBanner />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array(20)
          .fill()
          .map((_, i) => (
            <AllDestinationCard key={i} />
          ))}
      </div>
    </div>
  );
};

export default AllDestination;
