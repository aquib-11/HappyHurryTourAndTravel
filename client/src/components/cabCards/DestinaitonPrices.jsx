import React, { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Edit2, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import DeleteModal from "../shared/DeleteModal";

const TableHeader = ({ cabs, searchTerm, onSearchChange }) => (
  <thead>
    <tr className="bg-[var(--bs-gray-800)] rounded-xl text-[var(--bs-white)] ">
      <th className=" text-center p-4 text-[var(--bs-white)] font-semibold rounded-tl-lg border-[#4a55684b] border">
        Route
      </th>
      {cabs.map((cab) => (
        <th
          key={cab._id}
          className="text-nowrap p-4 capitalize text-center text-[var(--bs-white)] font-semibold border-[#4a55684b] border"
        >
          {cab.name.toLowerCase()}
        </th>
      ))}
      <th className="p-4 text-nowrap text-center text-[var(--bs-white)] font-semibold rounded-tr-lg border-[#4a55684b] border">
        <label htmlFor="search" className="text-sm font-semibold">
          Search destination
        </label>
        <div className="relative ">
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-1 px-4 py-1 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] border-none"
          />
        </div>
      </th>
    </tr>
  </thead>
);

const TableRow = ({ destination, cabs, index, fetchDestinations }) => {
  const [priceID, setPriceID] = useState(null);
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    setPriceID(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/cabPricing/${priceID}`);
      toast.success("Cab deleted successfully");
      setIsModalOpen(false);
      await fetchDestinations();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setIsDeleting(false);
      setPriceID(null);
    }
  };

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
      <td className="p-4 capitalize text-nowrap text-[var(--bs-gray-300)] border-b border-[#4a55684b] border-r">
        {destination.route.toLowerCase()}
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
        {user?.userRole === "admin" ? (
          <div className="flex justify-center items-center gap-4">
            <Link
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all duration-300 ease-in-out"
            to={`/admin/edit-cab-pricing/${destination._id}`}
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </Link>
            <button
              onClick={() => handleDelete(destination._id)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all duration-300 ease-in-out"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        ) : (
          <Link to={`/contact`} className="text-nowrap text-sm bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
            Send Enquiry
          </Link>
        )}
      </td>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={destination.route}
        isDeleting={isDeleting}
      />
    </tr>
  );
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between mt-4 text-[var(--bs-gray-300)]">
    <div className="flex items-center gap-1 px-2">
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
    </div>
    <div className="flex items-center ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-[var(--bs-gray-800)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`w-8 h-8 rounded-lg ${
            currentPage === idx + 1
              ? "bg-[var(--bs-gray-800)] text-white"
              : "hover:bg-[var(--bs-gray-800)]/30"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-[var(--bs-gray-800)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const MobileCard = ({
  destination,
  cabs,
  index,
  openId,
  setOpenId,
  fetchDestinations,
}) => {
  const { user } = useHomeLayoutContext();
  const [priceID, setPriceID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const getPriceForCab = (cabId) => {
    const priceEntry = destination.pricing.find((p) => p.cabType === cabId);
    return priceEntry ? priceEntry.price : "-";
  };

  const isOpen = openId === destination._id;

  const toggleAccordion = () => {
    setOpenId(isOpen ? null : destination._id);
  };

  const handleDelete = async (id) => {
    setPriceID(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/cabPricing/${priceID}`);
      toast.success("Cab deleted successfully");
      setIsModalOpen(false);
      await fetchDestinations();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setIsDeleting(false);
      setPriceID(null);
    }
  };

  return (
    <div
      className={`rounded-lg overflow-y-auto ${
        index % 2 === 0
          ? "bg-[var(--bs-gray-800)]/30"
          : "bg-[var(--bs-gray-800)]/10"
      }`}
    >
      <button
        onClick={toggleAccordion}
        className="w-full bg-[var(--bs-gray-800)] p-4 flex justify-between items-center"
      >
        <h3 className="font-sans text-[var(--bs-white)] font-semibold  capitalize">
          {destination.route.toLowerCase()}
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
          isOpen ? " opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-3 border border-[#4a55684b] border-t-0 overflow-y-auto">
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
          {user?.userRole === "admin" ? (
            <div className="flex justify-center items-center gap-4">
              <Link
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all duration-300 ease-in-out"
            to={`/admin/edit-cab-pricing/${destination._id}`}
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handleDelete(destination._id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all duration-300 ease-in-out"
                >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          ) : (
            <button className="bg-[#9288ec30] hover:bg-[#9288ec4d] text-[var(--bs-text)] px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105">
              Send Enquiry
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={destination.route}
        isDeleting={isDeleting}
      />
    </div>
  );
};

const DesktopTable = ({
  cabs,
  destinations,
  fetchDestinations,
  searchTerm,
  onSearchChange,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination after filtering
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = destinations.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div>
      <table className="w-full min-w-[ border-collapse border-spacing-0 border-b border-[#4a55684b] border">
        <TableHeader
          cabs={cabs}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
        <tbody>
          {currentDestinations.map((destination, index) => (
            <TableRow
              key={destination._id}
              destination={destination}
              index={index}
              cabs={cabs}
              fetchDestinations={fetchDestinations}
            />
          ))}
        </tbody>
      </table>
      {destinations.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

const MobileCards = ({ cabs, destinations, fetchDestinations }) => {
  const [openId, setOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  // Calculate pagination after filtering
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = destinations.slice(startIndex, endIndex);

  // Reset to first page when filtered results change
  useEffect(() => {
    setCurrentPage(1);
  }, [destinations.length]);

  return (
    <div className="space-y-4">
      {currentDestinations.map((destination, index) => (
        <MobileCard
          fetchDestinations={fetchDestinations}
          key={destination._id}
          destination={destination}
          index={index}
          cabs={cabs}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
      {destinations.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

const DestinationPrices = ({ cabs }) => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.get("/cabPricing");
      setDestinations(response.data.pricing);
    } catch (error) {
      console.error("Error fetching destination pricing:", error);
      toast.error("Failed to load destination pricing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Filter the complete dataset before pagination
  const filteredDestinations = destinations.filter((destination) =>
    destination.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-[var(--bs-card-bg)] p-6 rounded-xl shadow-lg">
        <div className="text-[var(--bs-gray-300)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-[var(--bs-card-bg)] p-3 md:p-6 rounded-xl shadow-lg">
      <div className="hidden lg:block">
        <DesktopTable
          cabs={cabs}
          destinations={filteredDestinations}
          fetchDestinations={fetchDestinations}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      <div className="lg:hidden">
        <div className="mb-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-3 placeholder:font-thin w-full rounded-lg bg-[#4a55684b] text-[var(--bs-gray-300)] border-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        <MobileCards
          cabs={cabs}
          destinations={filteredDestinations}
          fetchDestinations={fetchDestinations}
        />
      </div>
    </div>
  );
};

export default DestinationPrices;
