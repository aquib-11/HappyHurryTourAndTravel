import React from "react";
import { Link } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

const FeaturedHotels = () => {
  const { user } = useHomeLayoutContext();

  return (
    <div className="container ">
      <h1 className="font-sans font-bold text-white mb-8 text-center">
        Featured Hotels
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.hotels.map((hotel, index) => (
          <div key={index} className="relative">
            <div className="rounded-[20px] overflow-hidden">
              <img
                src={hotel?.images[0]?.image}
                alt={hotel?.name}
                className="w-full md:h-[25rem] h-72  object-cover"
              />
              <div className="absolute bottom-20 lg:bottom-28 left-5 ">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < hotel?.rating ? "text-yellow-400" : "text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 ml-3">
              <Link
                to={`/know-about-hotel/${hotel?._id}`}
                className="text-xl capitalize font-semibold font-sans text-white line-clamp-1"
              >
                {hotel?.name.toLowerCase()}
              </Link>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="text-emerald-400 ">₹ {hotel.price}</span>
                  <span className="text-gray-400 text-sm ml-1">
                    /starting at
                  </span>
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
