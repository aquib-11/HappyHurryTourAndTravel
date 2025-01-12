import React from 'react';
import { destinations } from '../../utils/destinationPricing';

const TableHeader = () => (
  <thead>
    <tr className="bg-[var(--bs-gray-800)] rounded-xl text-[var(--bs-white)]">
      <th className="py-4 px-6 text-left text-[var(--bs-white)] font-semibold rounded-tl-lg border-[#4a55684b] border">
        Destination
      </th>
      <th className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold border-b border-[#4a55684b] border">Sedan</th>
      <th className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold border-[#4a55684b] border">SUV</th>
      <th className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold border-[#4a55684b] border">Tempo Traveller</th>
      <th className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold rounded-tr-lg border-[#4a55684b] border ">
        <input
          type="search"
          placeholder="Search Cab..."
          className="px-3 py-2 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] border-none"
        />
      </th>
    </tr>
  </thead>
);

const TableRow = ({ destination, index }) => (
  <tr
    className={`${
      index % 2 === 0 ? 'bg-[var(--bs-gray-800)]/30' : 'bg-[var(--bs-gray-800)]/10'
    } hover:bg-[var(--bs-gray-800)]/50 transition-colors`}
  >
    <td className="py-4 px-6 text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">{destination.name}</td>
    <td className="py-4 px-6 text-center text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">
      {destination.sedan.toLocaleString()}
    </td>
    <td className="py-4 px-6 text-center text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">
      {destination.suv.toLocaleString()}
    </td>
    <td className="py-4 px-6 text-center text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">
      {destination.tempo.toLocaleString()}
    </td>
    <td className="py-4 px-6 text-center border-b border-[#4a55684b]">
      <button className="bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
        Send Enquiry
      </button>
    </td>
  </tr>
);

const DesktopTable = () => (
  <table className="w-full min-w-[800px] border-collapse border-spacing-0 border-b border-[#4a55684b] border">
    <TableHeader />
    <tbody>
      {destinations.map((destination, index) => (
        <TableRow key={index} destination={destination} index={index} />
      ))}
    </tbody>
  </table>
);

const MobileCard = ({ destination, index }) => (
  <div
    key={index}
    className={`rounded-lg overflow-hidden ${
      index % 2 === 0 ? 'bg-[var(--bs-gray-800)]/30' : 'bg-[var(--bs-gray-800)]/10'
    }`}
  >
    <div className="bg-[var(--bs-gray-800)] p-4">
      <h3 className="text-[var(--bs-white)] font-semibold">{destination.name}</h3>
    </div>
    <div className="p-4 space-y-3 border border-[#4a55684b] border-t-0">
      <div className="flex justify-between items-center border-b border-[#4a55684b] pb-2">
        <span className="text-[var(--bs-gray-300)]">Sedan</span>
        <span className="text-[var(--bs-gray-300)]">{destination.sedan.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center border-b border-[#4a55684b] pb-2">
        <span className="text-[var(--bs-gray-300)]">SUV</span>
        <span className="text-[var(--bs-gray-300)]">{destination.suv.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center border-b border-[#4a55684b] pb-2">
        <span className="text-[var(--bs-gray-300)]">Tempo Traveller</span>
        <span className="text-[var(--bs-gray-300)]">{destination.tempo.toLocaleString()}</span>
      </div>
      <button className="w-full bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
        Send Enquiry
      </button>
    </div>
  </div>
);

const MobileCards = () => (
  <div className="space-y-4">
    <div className="mb-4">
      <input
        type="search"
        placeholder="Search Cab..."
        className="px-4 py-3 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] text-[var(--bs-gray-300)] border-none"
      />
    </div>
    {destinations.map((destination, index) => (
      <MobileCard key={index} destination={destination} index={index} />
    ))}
  </div>
);

const PricingTable = () => {
  return (
    <div className="w-full overflow-x-auto bg-[var(--bs-card-bg)] p-6 rounded-xl shadow-lg">
      {/* Desktop view (hidden on mobile) */}
      <div className="hidden lg:block">
        <DesktopTable />
      </div>

      {/* Mobile view (hidden on desktop) */}
      <div className="lg:hidden">
        <MobileCards />
      </div>
    </div>
  );
};

export default PricingTable;
