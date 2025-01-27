import React, { useState } from "react";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import DeleteModal from "../shared/DeleteModal";
import { CarDetailModel } from "..";

const CarCard = ({ cab }) => {
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/cab/${cab._id}`);
      toast.success("Cab deleted successfully");
      setIsModalOpen(false);
      setIsDeleting(false);
      navigate("/cab-home");
    } catch (error) {
      setIsDeleting(false);
      toast.error(error?.response?.data?.msg || error.message);
    }
  };

  return (
    <div
      onClick={() => setIsCardOpen(!isCardOpen)}
      className="w-full cursor-pointer md:w-[320px] bg-[var(--bs-card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
    >
      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-10">
        {cab.isAvailable ? (
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
            <CheckCircle size={16} />
            <span>Available</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm">
            <XCircle size={16} />
            <span>Unavailable</span>
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden p-2">
        <img
          src={cab.image}
          alt={cab.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-lg"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex items-start flex-col justify-between">
        <h3 className="text-xl font-bold font-sans text-gray-800 dark:text-white mb-3 capitalize">
          {cab.name}
        </h3>

        <div className="space-y-3">
          {/* Seating Capacity */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Users size={18} />
            <span>{cab.seatingCapacity} Seats</span>
          </div>

          {/* Features */}
        </div>
      </div>
      {/* Admin Controls */}
      {user?.userRole === "admin" && (
        <div className="flex items-center justify-center gap-4 mt-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/admin/edit-cab/${cab._id}`}
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
        itemName={cab.name}
        isDeleting={isDeleting}
      />
      {isCardOpen && (
        <CarDetailModel
          isOpen={isCardOpen}
          onClose={() => setIsCardOpen(false)}
          cab={cab}
        />
      )}
    </div>
  );
};

export default CarCard;
