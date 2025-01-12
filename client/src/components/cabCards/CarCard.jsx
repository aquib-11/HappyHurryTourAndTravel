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

const CarCard = ({ cab }) => {
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
    <div className="w-full md:w-[320px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative">
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
      <div className="relative h-48 overflow-hidden">
        <img
          src={cab.image}
          alt={cab.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex items-center flex-col justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {cab.name}
        </h3>

        <div className="space-y-3">
          {/* Seating Capacity */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Users size={18} />
            <span>{cab.seatingCapacity} Seats</span>
          </div>

          {/* Features */}
          {/* {cab.features && cab.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {cab.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {/* Admin Controls */}
        {user?.userRole === "admin" && (
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to={`/admin/edit-cab/${cab._id}`}
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
        itemName={cab.name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CarCard;
