import React from "react";
import { ArrowLeftRight } from "lucide-react";
const Roadtrip = () => {
  return (
    <div className="max-w-3xl mx-auto  bg-[var(--bs-card-bg)] ">
      {/* Location Selection */}
      <div className="grid grid-cols-2 gap-4 items-center mb-6">
        {/* Pickup Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Pickup</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select Location"
              className="cabInputs"            />
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Drop</label>
          <input
            type="text"
            placeholder="Select Location"
            className="cabInputs"          />
        </div>
      </div>

      {/* Pickup Date/Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Pickup Date
          </label>
          <input
            type="date"
            placeholder="Select Date"
            className="cabInputs"          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Pickup time
          </label>
          <input
            type="time"
            placeholder="Select Time"
            className="cabInputs"          />
        </div>
      </div>

      {/* Return Date/Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Return Date
          </label>
          <input
            type="date"
            placeholder="Select Date"
            className="cabInputs"          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Return time
          </label>
          <input
            type="time"
            placeholder="Select Time"
            className="cabInputs"          />
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-[var(--bs-black)] text-white font-semibold py-3 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors">
        Search Cabs
      </button>
    </div>
  );
};

export default Roadtrip;
