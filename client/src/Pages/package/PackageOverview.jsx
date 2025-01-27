import React from "react";
import { useOutletContext } from "react-router-dom";

const PackageOverview = () => {
  const _package = useOutletContext();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="mt-8 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-4 md:p-8">
        <h2 className="text-3xl font-bold font-sans text-white mb-4">Overview</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          {_package?.overview}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/40 rounded-xl p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/60 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Duration</p>
              <p className="text-white text-xl font-bold mt-1">
                {_package?.totaldays} Days
              </p>
              <p className="text-white text-lg">
                {_package?.totalnights} Nights
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-xl p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/60 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Group Size</p>
              <p className="text-white text-xl font-bold mt-1">
                {_package?.minGroupSize} - {_package?.maxGroupSize}
              </p>
              <p className="text-white text-lg">People</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-xl p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/60 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Starting From</p>
              <p className="text-white text-xl font-bold mt-1">
                {formatPrice(_package?.adultPrice)}
              </p>
              <p className="text-white text-lg">Per Adult</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-4 md:p-8">
        <h3 className="text-2xl font-bold font-sans text-white mb-6">Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {_package?.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-gray-300">{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-4">
        <h3 className="text-2xl font-bold font-sans text-white mb-6">Tour Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50  border border-gray-700 p-6 rounded-lg">
            <p className="text-gray-400 mb-2">Adult Price</p>
            <p className="text-3xl font-bold text-white">
              {formatPrice(_package?.adultPrice)}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
            <p className="text-gray-400 mb-2">Child Price</p>
            <p className="text-3xl font-bold text-white">
              {formatPrice(_package?.childPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageOverview;
