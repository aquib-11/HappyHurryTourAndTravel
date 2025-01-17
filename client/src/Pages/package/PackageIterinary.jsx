import { useOutletContext } from "react-router-dom";

const PackageItinerary = () => {
  const _package = useOutletContext();

  // SVG Icons as components for better organization
  const LocationIcon = () => (
    <svg
      className="w-5 h-5 text-orange-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const CompassIcon = () => (
    <svg
      className="w-6 h-6 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );

  return (
    <div className="mt-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <CompassIcon />
          <h2 className="text-3xl font-bold text-white">
            Your Adventure Itinerary
          </h2>
        </div>
        <p className="text-gray-300">
          Experience an unforgettable journey across{" "}
          {_package?.itinerary.length} days of carefully crafted experiences
        </p>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-8">
        {_package?.itinerary.map((item, index) => (
          <div key={item} className="relative pl-8 md:pl-12 group">
            {/* Animated timeline line */}
            {index !== _package.itinerary.length - 1 && (
              <div className="absolute left-4 md:left-6 top-12 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
            )}

            {/* Animated day number */}
            <div className="absolute left-0 md:left-2 top-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-bold">{index + 1}</span>
            </div>

            {/* Content Card */}
            <div className="relative ml-4 group">
              {/* Day indicator */}
              <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-white/10 transform -translate-y-1/2 group-hover:scale-150 transition-transform duration-300"></div>

              <div
                className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-6 backdrop-blur-sm 
                             transform transition-all duration-300 hover:translate-x-2 hover:bg-gray-800/60
                             border border-gray-700/50 hover:border-blue-500/50 group"
              >
                {/* Day Title */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                 rounded-full text-blue-400 text-sm font-semibold"
                  >
                    Day {index + 1}
                  </span>

                  {/* Special day indicators */}
                  {index === 0 && (
                    <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      Journey Begins
                    </span>
                  )}
                  {index === _package.itinerary.length - 1 && (
                    <span className="px-4 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                      Final Day
                    </span>
                  )}
                </div>

                {/* Itinerary Content */}
                <div className="flex items-start gap-3">
                  <LocationIcon />
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {item}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageItinerary;
