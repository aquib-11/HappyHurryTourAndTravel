import React from "react";
import { ArrowLeftRight } from "lucide-react";

const OneWay = () => {
  return (
    <div className="max-w-3xl mx-auto  bg-[var(--bs-card-bg)]">
      {/* Location Inputs Row */}
      <div className="grid grid-cols-2 gap-4 items-center justify-center mb-4">
        {/* Pickup Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Pickup</label>
          <input
            type="text"
            placeholder="Select location"
            className="cabInputs"
          />
        </div>
        {/* Drop Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Drop</label>
          <input
            type="text"
            placeholder="Select Location"
            className="cabInputs"
          />
        </div>
      </div>

      {/* Date and Time Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Pickup Date */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)]mb-2">
            Pickup Date
          </label>
          <input type="date" placeholder="Select Date" className="cabInputs" />
        </div>

        {/* Pickup Time */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] ">Pickup time</label>
          <input type="time" placeholder="Select Date" className="cabInputs" />
        </div>
        <select className="cabInputs" defaultValue={"select car"}>
          <option value="select car" disabled>
            Select Car
          </option>
          <option value="sedan">Sedan</option>
          <option value="swift">Swift</option>
        </select>
        {/* Search Button */}
        <button className="w-full bg-[var(--bs-black)] text-[var(--bs-white)] font-semibold py-3 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default OneWay;
