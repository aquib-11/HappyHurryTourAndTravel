import { useOutletContext } from "react-router-dom";

const InclusionExclusion = () => {
  const _package = useOutletContext();

  const CheckIcon = () => (
    <svg
      className="w-5 h-5 text-green-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      className="w-5 h-5 text-red-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className=" mt-8 space-y-8">
      {/* Inclusions Section */}
      <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">What's Included</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {_package?.inclusions.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <CheckIcon />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions Section */}
      <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">What's Not Included</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {_package?.exclusions.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <CrossIcon />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Card */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-blue-200 text-sm">
            Please note that package inclusions and exclusions may vary based on
            seasonal availability and local conditions. Contact us for the most
            up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InclusionExclusion;
