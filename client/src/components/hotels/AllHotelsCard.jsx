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
    <div className="bg-[var(--bs-card-bg)] rounded-lg overflow-hidden ">
      <div className="relative">
        <div className="">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-[220px] object-cover"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-white">{rating}</span>
          </div>
          {/* {user?.userRole === "admin" && (
            <div>
              <Link
               
                className="text-[var(--bs-link-color)] transition-colors duration-300 hover:text-[var(--bs-link-hover-color)]"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(_id)} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )} */}
        </div>
        <h3 className="font-sans font-semibold text-[var(--bs-white)]">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2 my-2 text-gray-400">
          <p className="line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-xl font-semibold">
              ${price} <span className="text-gray-400">/day</span>
            </span>
          </div>
          <Link
            to={`/know-about-hotel/${_id}`}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View Detail
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      {/* Admin Controls */}
      {user?.userRole === "admin" && (
        <div className="pb-2 flex justify-center items-center   gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/admin/edit-hotel/${_id}`}
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
