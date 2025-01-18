import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import DeleteModal from "../shared/DeleteModal";
import {
  Trash2,
  ChevronRight,
  MessageSquare,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BookOneWayNotification = ({ bookOneWay }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deleteOneWayBooking = async (id) => {
    setIsDeleting(true);
    try {
      const res = await customFetch.delete(`/bookings/one-way/${deleteId}`);
      if (res.status === 200) {
        setIsDeleting(false);
        toast.success("Booking deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete booking");
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking");
    }
  };

  const confirmDelete = () => {
    deleteOneWayBooking();
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <h4 className="text-xl font-semibold text-white mb-6 text-center">
        One Way Cab Notifications
      </h4>

      <div className="space-y-2">
        {bookOneWay.map((oneWay, index) => (
          <div
            key={oneWay._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm 
                     border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex items-start gap-4 p-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              {/* Avatar or Icon */}
              <img
                className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  oneWay.customerName || "Anonymous"
                )}&background=random`}
                alt="User Avatar"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-sm md:text-xl font-sans">
                      {oneWay.customerName}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-base mb-0">
                      {oneWay.customerName} booked a {oneWay.selectCab.name} for
                      destination {oneWay.dropLocation} for {oneWay.pickupDate}{" "}
                      at {oneWay.pickupTime}
                    </p>
                    <span className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(oneWay.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {!activeIndex === index && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                          setDeleteId(oneWay._id);
                        }}
                        className="px-4 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 
                                 hover:bg-red-500/20 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300
                  ${activeIndex === index ? "rotate-180" : ""}`}
              />
            </div>
            {activeIndex === index && (
              <div className=" border-t border-gray-700/50 space-y-4 p-2">
                <div className="flex items-center gap-4">
                  <img
                    src={oneWay.selectCab.image}
                    alt={oneWay.selectCab.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      {oneWay.selectCab.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{oneWay.pickupDate}</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm md:text-xl ">
                      To: {oneWay.dropLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300  text-sm md:text-xl">
                      At: {oneWay.pickupTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDeleteId(oneWay._id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 
                                   bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                  <span>Delete Notification</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName="this notification"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BookOneWayNotification;
