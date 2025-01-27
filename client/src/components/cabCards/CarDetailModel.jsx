import React, { useEffect } from "react";
import { X } from "lucide-react";

const CarDetailModal = ({ isAvailable = true, onClose, cab }) => {
  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-[600px] bg-[var(--bs-card-bg)] rounded-lg p-4 md:p-6 mx-auto duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 right-2 top-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Car Image Section */}
          <div className="w-full md:w-64 bg-gray-800 rounded-lg p-3 md:p-4">
            <div className="w-full h-full object-cover relative">
              <img
                src={cab.image}
                alt="Car Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-2">
              <div>
                <h2 className="text-white font-sans font-bold mb-1">
                  {cab.name}
                </h2>
                <div className="flex flex-wrap gap-2 text-gray-400 text-sm md:text-base">
                  {cab.features.map((feature) => (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{feature}</span>
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="break-all sm:break-normal">
                  Driver's Name: {cab.driverName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="break-all sm:break-normal">
                  Mobile: {cab.driverPhone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium">
                  {isAvailable ? (
                    <span className="text-green-400 bg-green-900/20 flex items-center gap-2 py-2  px-4 rounded-md">
                      <span>•</span> Available
                    </span>
                  ) : (
                    <span className="text-red-400 bg-red-900/20 flex items-center gap-2 py-2  px-4 rounded-md">
                      <span>•</span> Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
          <div className="bg-green-900/20 text-green-400 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm text-center sm:text-left">
            Free Cancellation, till 1 hour of Pick up
          </div>
          <div className="bg-green-900/20 text-green-400 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm text-center sm:text-left">
            Free waiting up to 45 minutes
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
