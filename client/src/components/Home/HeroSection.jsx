import React from "react";
import img from "../../assets/images/bg6.jpg";
const HeroSection = () => {
  return (
    <div className="container text-white relative py-3">
      {/* Content Container */}
      <div className="max-w-6xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-[1.8rem] md:text-5xl font-sans font-bold leading-tight">
              Discover Your Next
              <br />
              Adventure with Us.
              <div className="h-1 w-24 bg-purple-500 mt-2"></div>
            </h1>

            <p className="text-gray-400 text-lg font-sans">
              Happy Hurry Tour and Travel brings you unforgettable journeys,
              offering luxury stays and curated travel experiences within your
              budget. Explore, relax, and make memories with us.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-[--bs-blur-bg] transition-colors duration-200 hover:bg-purple-700 hover:text-white text-[var(--bs-text)] px-6 py-2 rounded-lg font-bold">
                Discover Now
              </button>
            </div>
          </div>

          {/* Right Column - Image Area */}
          <div className="relative">
            <div className=" backdrop-blur-sm rounded-2xl ">
              <img
                src={img}
                alt="Luxury Hotel Interior"
                className="rounded-xl w-full"
              />

              {/* Support Badge */}
              <div className="absolute -right-4 top-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">24/7</div>
                    <div className="text-sm text-gray-600">Guide Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
