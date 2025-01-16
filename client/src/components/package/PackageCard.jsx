import dayjs from "dayjs";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Edit2, Trash2 } from "lucide-react";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import DeleteModal from "../shared/DeleteModal";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
dayjs.extend(advancedFormat);

const PackageCard = ({ _package,  }) => {
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/tourPackage/${_package._id}`);
      toast.success("package deleted successfully");
      navigate("/all-packages");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    } finally {
      setIsDeleting(false);
    }
  };
  const date = dayjs(_package.createdAt).format("MMM DD, YYYY");
  return (
    <div className="max-w-md rounded-xl overflow-hidden bg-[var(--bs-card-bg)] text-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={_package.image}
          alt="Aerial view of beach"
          className="w-full h-56 object-cover"
        />

        {/* Duration Tag */}
        <span className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 rounded-full text-sm">
          {_package.totaldays} days / {_package.totalnights} nights
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-sans font-semibold text-[var(--bs-white)]">
          {_package.name}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <span>{date}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-400">
          {_package.destinations?.length > 0 && <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>{_package.destinations.length } Destinations</span>
          </div>}
          <span>•</span>
         {_package.hotels?.length > 0 && <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{_package.hotels?.length } Hotels</span>
          </div>}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="font-sans text-xl font-semibold mr-3">
              price
            </span>
            <span className="text-green-400 text-lg font-bold">{_package.adultPrice}</span>
          </div>
          <Link to={`/package/${_package._id}`} className="bg-[#9288ec30] hover:bg-[#9288ec5b] text-[var(--bs-text)] px-4 py-2 rounded-lg transition-colors duration-300">
            View Details
          </Link>
        </div>
        {user?.userRole === "admin" && (
        <div className="pb-2 flex justify-center items-center   gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/admin/edit-tour-package/${_package._id}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Edit2 size={16} />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={_package.name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PackageCard;
