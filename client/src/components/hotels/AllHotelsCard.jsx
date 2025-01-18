import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Edit2,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import DeleteModal from "../shared/DeleteModal";
import { FaRupeeSign } from "react-icons/fa";

const AllHotelsCard = ({ hotel }) => {
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const {
    _id,
    name,
    rating,
    price,
    originalPrice,
    images,
    amenities,
    description,
  } = hotel;

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/hotel/${_id}`);
      toast.success("Hotel deleted successfully");
      navigate("/all-hotels");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    } finally {
      setIsDeleting(false);
    }
  };
  const coverImage =
    images[0]?.image ||
    "https://themes.stackbros.in/booking_ng/assets/09-NZkssKcO.jpg";

  return (
    <div className="flex flex-col justify-between bg-[var(--bs-card-bg)] rounded-lg overflow-hidden ">
      <div className="relative">
        <div className="">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-[220px] object-cover"
          />
        </div>
      </div>

      <div className="p-3 space-y-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-white">{rating}</span>
          </div>
        </div>
        <h3 className="font-sans font-bold text-[var(--bs-white)] capitalize">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2 text-sm text-gray-400">
          <p className="line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-sm md:text-lg font-semibold flex gap-1 items-center">
              <FaRupeeSign />
              {price} <span className="text-gray-400">/day</span>
            </span>
          </div>
          <Link
            to={`/know-about-hotel/${_id}`}
            className="bg-[#9288ec30] hover:bg-[#9288ec5b] text-sm text-[var(--bs-text)] px-3 py-2 rounded-lg transition-colors duration-300"
          >
            View Detail
          </Link>
        </div>
      </div>
      {/* Enhanced Admin Controls */}
      {user?.userRole === "admin" && (
        <div className="flex justify-center gap-2 m-4 pt-4  border-t border-[var(--bs-gray-700)]  ">
          <Link
            to={`/admin/edit-hotel/${_id}`}
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
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AllHotelsCard;