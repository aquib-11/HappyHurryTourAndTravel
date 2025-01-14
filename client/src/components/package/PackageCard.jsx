import React from "react";
import img from "../../assets/images/bg6.jpg";
const PackageCard = () => {
  return (
    <div className="max-w-md rounded-xl overflow-hidden bg-[var(--bs-card-bg)] text-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={img}
          alt="Aerial view of beach"
          className="w-full h-56 object-cover"
        />

        {/* Duration Tag */}
        <span className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 rounded-full text-sm">
          5 days / 4 nights
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-sans font-semibold text-[var(--bs-white)]">
          Sun Siyam Iru Veli Vacation
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <span>April 22-28</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Packages</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>1 Hotel</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="font-sans text-xl font-semibold mr-3">
              Starting from:
            </span>
            <span className="text-green-400 text-lg font-bold">₹725</span>
          </div>
          <button className="bg-[#9288ec30] hover:bg-[#9288ec5b] text-[var(--bs-text)] px-4 py-2 rounded-lg transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
