import React, { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

const TableHeader = ({ cabs }) => (
  <thead>
    <tr className="bg-[var(--bs-gray-800)] rounded-xl text-[var(--bs-white)]">
      <th className="py-4 px-6 text-left text-[var(--bs-white)] font-semibold rounded-tl-lg border-[#4a55684b] border">
        Route
      </th>
      {cabs.map((cab) => (
        <th
          key={cab._id}
          className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold border-[#4a55684b] border"
        >
          {cab.name}
        </th>
      ))}
      <th className="py-4 px-6 text-center text-[var(--bs-white)] font-semibold rounded-tr-lg border-[#4a55684b] border">
        <input
          type="search"
          placeholder="Search Route..."
          className="px-3 py-2 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] border-none"
        />
      </th>
    </tr>
  </thead>
);

const TableRow = ({ destination, cabs, index }) => {
  const getPriceForCab = (cabId) => {
    const priceEntry = destination.pricing.find((p) => p.cabType === cabId);
    return priceEntry ? priceEntry.price : "---";
  };

  return (
    <tr
      className={`${
        index % 2 === 0
          ? "bg-[var(--bs-gray-800)]/30"
          : "bg-[var(--bs-gray-800)]/10"
      } hover:bg-[var(--bs-gray-800)]/50 transition-colors`}
    >
      <td className="py-4 px-6 text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">
        {destination.route}
      </td>
      {cabs.map((cab) => (
        <td
          key={cab._id}
          className="py-4 px-6 text-center text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r"
        >
          {getPriceForCab(cab._id).toLocaleString()}
        </td>
      ))}
      <td className="py-4 px-6 text-center border-b border-[#4a55684b]">
        <button className="bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
          Send Enquiry
        </button>
      </td>
    </tr>
  );
};

const DesktopTable = ({ cabs, destinations }) => (
  <table className="w-full min-w-[800px] border-collapse border-spacing-0 border-b border-[#4a55684b] border">
    <TableHeader cabs={cabs} />
    <tbody>
      {destinations.map((destination, index) => (
        <TableRow
          key={destination._id}
          destination={destination}
          index={index}
          cabs={cabs}
        />
      ))}
    </tbody>
  </table>
);

const MobileCard = ({ destination, cabs, index, openId, setOpenId }) => {
  const getPriceForCab = (cabId) => {
    const priceEntry = destination.pricing.find((p) => p.cabType === cabId);
    return priceEntry ? priceEntry.price : "-";
  };

  const isOpen = openId === destination._id;

  const toggleAccordion = () => {
    setOpenId(isOpen ? null : destination._id);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden ${
        index % 2 === 0
          ? "bg-[var(--bs-gray-800)]/30"
          : "bg-[var(--bs-gray-800)]/10"
      }`}
    >
      <button
        onClick={toggleAccordion}
        className="w-full bg-[var(--bs-gray-800)] p-4 flex justify-between items-center"
      >
        <h3 className="text-[var(--bs-white)] font-semibold">
          {destination.route}
        </h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-3 border border-[#4a55684b] border-t-0">
          {cabs.map((cab) => (
            <div
              key={cab._id}
              className="flex justify-between items-center border-b border-[#4a55684b] pb-2"
            >
              <span className="text-[var(--bs-gray-300)]">{cab.name}</span>
              <span className="text-[var(--bs-gray-300)]">
                {getPriceForCab(cab._id).toLocaleString()}
              </span>
            </div>
          ))}
          <button className="w-full bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
            Send Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const MobileCards = ({ cabs, destinations }) => {
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((destination) =>
    destination.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search Route..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] text-[var(--bs-gray-300)] border-none"
        />
      </div>
      {filteredDestinations.map((destination, index) => (
        <MobileCard
          key={destination._id}
          destination={destination}
          index={index}
          cabs={cabs}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
    </div>
  );
};

const DestinationPrices = ({ cabs }) => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await customFetch.get("/cabPricing");
        setDestinations(response.data.pricing);
      } catch (error) {
        console.error("Error fetching destination pricing:", error);
        toast.error("Failed to load destination pricing.");
      }
    };
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-auto bg-[var(--bs-card-bg)] p-3 md:p-6 rounded-xl shadow-lg">
      <div className="hidden lg:block">
        <DesktopTable cabs={cabs} destinations={filteredDestinations} />
      </div>
      <div className="lg:hidden">
        <MobileCards cabs={cabs} destinations={filteredDestinations} />
      </div>
    </div>
  );
};

export default DestinationPrices;
