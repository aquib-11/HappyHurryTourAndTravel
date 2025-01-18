import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import DeleteModal from "../shared/DeleteModal";
import {
  Trash2,
  ChevronDown,
  MapPin,
  Clock,
  Mail,
  Navigation,
  Phone
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

  const deleteOneWayBooking = async () => {
    setIsDeleting(true);
    try {
      await customFetch.delete(`/bookOneWay/${deleteId}`);
      setIsDeleting(false);
      toast.success("Booking deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking");
    }
  };

  const confirmDelete = () => {
    deleteOneWayBooking();
    setIsModalOpen(false);
  };

  const formatIndianTime = (timeString) => {
    // Convert 24-hour format to Indian time format
    if (!timeString) return "";
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      
      if (hour === 0) return `12:${minutes} AM`;
      if (hour === 12) return `12:${minutes} PM`;
      if (hour > 12) return `${hour - 12}:${minutes} PM`;
      return `${hour}:${minutes} AM`;
    } catch {
      return timeString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h4 className="text-xl font-semibold text-white mb-6 text-center">
        One Way Cab Notifications
      </h4>

      <div className="space-y-4">
        {bookOneWay.map((oneWay, index) => (
          <div
            key={oneWay._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm 
                     border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex items-start gap-4 p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <img
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  oneWay.customerName || "Anonymous"
                )}&background=random`}
                alt={oneWay.customerName}
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-lg">
                      {oneWay.customerName}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      One way booking from {oneWay.pickupLocation} to {oneWay.dropLocation}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-xs">
                        {formatDistanceToNow(new Date(oneWay.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300
                      ${activeIndex === index ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            </div>

            {activeIndex === index && (
              <div className="border-t border-gray-700/50 p-4 space-y-4">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <img
                    src={oneWay.selectCab.image}
                    alt={oneWay.selectCab.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-white font-medium text-lg">
                      {oneWay.selectCab.name}
                    </h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <a
                          href={`mailto:${oneWay.customerEmail}`}
                          className="cursor-pointer text-sm underline text-blue-400"
                        >
                          {oneWay.customerEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <a
                          href={`tel:${oneWay.phoneNumber}`}
                          className="cursor-pointer text-sm  text-blue-400"
                        >
                          {oneWay.phoneNumber}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">
                          From: {oneWay.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">
                          To: {oneWay.dropLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">
                          Date: {oneWay.pickupDate} at {formatIndianTime(oneWay.pickupTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDeleteId(oneWay._id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 
                           bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors w-full"
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                  <span>Delete Booking</span>
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
        itemName="this booking"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BookOneWayNotification;