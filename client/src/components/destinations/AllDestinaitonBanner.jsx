import React from "react";

const AllDestinaitonBanner = ({ randomImages }) => {
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  return (
    <div
      className="relative rounded-2xl p-12 container md:h-[300px] grid place-items-center"
      style={{
        backgroundImage: `url(${randomImages[randomIndex]})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-2xl"></div>
      <div className="relative text-[var(--bs-white)] text-center">
        <h1 className="font-sans">All Destinations</h1>
      </div>
    </div>
  );
};

export default AllDestinaitonBanner;
