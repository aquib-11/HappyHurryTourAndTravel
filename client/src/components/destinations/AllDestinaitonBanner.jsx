import React from "react";
import bgImg from "../../assets/images/bg6.jpg";
const AllDestinaitonBanner = () => {
  return (
    <div
      className="rounded-2xl p-12 container md:h-[300px] grid place-items-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-[var(--bs-white)]  text-center">
        <h1>All Destinations </h1>
      </div>
    </div>
  );
};

export default AllDestinaitonBanner;
