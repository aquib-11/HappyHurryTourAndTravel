import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import { Link, redirect } from "react-router-dom";

import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

const AllHotelsCard = ({ hotel }) => {
  const { user } = useHomeLayoutContext();
  console.log({ userinCard: user });
  const [isDeleting, setIsDeleting] = useState(false);
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
  const handleDelete = (id) => {
    try {
      setIsDeleting(true);
      customFetch.delete(`/hotel/${id}`);
      toast.success("Hotel deleted successfully");
      return redirect("/all-hotels");
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
    <div className="bg-gray-900 rounded-lg overflow-hidden ">
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
          {user?.userRole === "admin" && (
            <div>
              <Link
                to={`/admin/edit-hotel/${_id}`}
                className="text-[var(--bs-link-color)] transition-colors duration-300 hover:text-[var(--bs-link-hover-color)]"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(_id)} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>

        <h3 className="text-white text-xl font-semibold mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4 ">
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
    </div>
  );
};

export default AllHotelsCard;
