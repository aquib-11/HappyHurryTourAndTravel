import React from "react";
import { Link } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

const TravelPackages = () => {
  const { user } = useHomeLayoutContext();

  return (
    <div className="container ">
      <h1 className="font-sans font-bold text-white text-center mb-8">
        Our Best Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center ">
        {user?.packages?.map((pkg) => (
          <div
            key={pkg._id}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-[24rem] overflow-hidden rounded-xl">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-5 left-3 flex items-center space-x-2 ">
                <h3 className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {pkg?.destinations?.length} Places
                </h3>
                <h3 className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {pkg?.hotels?.length} Hotels
                </h3>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {pkg.totaldays} Days/ {pkg.totalnights} Nights
                </span>
              </div>
            </div>
            <div className="py-4 space-y-2 ">
              <Link
                to={`/package/${pkg._id}`}
                className="text-lg capitalize font-bold text-[var(--bs-white)] hover:text-indigo-400 font-sans  mb-2 line-clamp-1"
              >
                {pkg.name.toLowerCase()}
              </Link>
              <div className="flex justify-between items-start text-xs font-bold text-green-400">
                <div className="flex items-center">
                  Adult Price:
                  <span className="ml-1 font-light text-gray-300">
                    ₹ {pkg.adultPrice}
                  </span>
                </div>
                {pkg?.childPrice && (
                  <div className="flex items-center">
                    Child Price:
                    <span className="ml-1 text-gray-300 font-light">
                      ₹ {pkg.childPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPackages;
