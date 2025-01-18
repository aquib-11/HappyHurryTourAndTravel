import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHotel,
  FaRupeeSign,
} from "react-icons/fa";
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

const PackageCard = ({ _package }) => {
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
    <div className="rounded-xl overflow-hidden bg-[var(--bs-card-bg)] text-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={_package.image}
          alt={_package.name}
          className="w-full h-56 object-cover"
        />

        {/* Duration Tag */}
        <span className="absolute bottom-4 left-4 bg-white font-bold text-black px-3 py-1 rounded-full text-sm">
          {_package.totaldays} days / {_package.totalnights} nights
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-1">
        {/* Title */}
        <h3 className="font-sans font-bold capitalize text-[var(--bs-white)]">
          {_package.name}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <FaCalendarAlt className="w-3 h-3 text-[--bs-gray-300]" />
          <span>{date}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          {_package.destinations?.length > 0 && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-3 h-3 text-[--bs-yellow]" />
              <span>{_package.destinations.length} Destinations</span>
            </div>
          )}
          <span>•</span>
          {_package.hotels?.length > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <FaHotel className="w-3 h-3 text-[--bs-cyan]" />
              <span>{_package.hotels.length} Hotels</span>
            </div>
          )}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center justify-center">
            <span className="text-green-400 text-lg  font-bold">
              <FaRupeeSign />
            </span>
            :<span className="font-sans text-lg font-semibold mr-3"> {_package.adultPrice}</span>
           
          </div>
          <Link
            to={`/package/${_package._id}`}
            className="bg-[#9288ec30] hover:bg-[#9288ec5b] text-sm text-[var(--bs-text)] px-3 py-2 rounded-lg transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
        {user?.userRole === "admin" && (
          <div className="pb-2 flex justify-center items-center   gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to={`/admin/edit-tour-package/${_package._id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all duration-300 ease-in-out"
              >
              <Edit2 size={16} />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all duration-300 ease-in-out"
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
