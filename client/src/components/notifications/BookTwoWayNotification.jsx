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
  RotateCcw,
  Phone,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BookTwoWayNotification = ({ bookTwoWay }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deleteTwoWayBooking = async () => {
    setIsDeleting(true);
    try {
      await customFetch.delete(`/bookTwoWay/${deleteId}`);
      setIsDeleting(false);
      toast.success("Booking deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking");
    }
  };

  const confirmDelete = () => {
    deleteTwoWayBooking();
    setIsModalOpen(false);
  };

  const formatIndianTime = (timeString) => {
    if (!timeString) return "";

    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours, 10);

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
      <h4 className="text-xl font-semibold font-sans text-white mb-6 text-center">
        Two Way Cab Notifications
      </h4>

      <div className="space-y-4">
        {bookTwoWay.map((twoWay, index) => (
          <div
            key={twoWay._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm 
             border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex flex-col items-start gap-4 p-4 cursor-pointer transition-all duration-300"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center gap-4 w-full">
                <img
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    twoWay.customerName || "Anonymous"
                  )}&background=random`}
                  alt={twoWay.customerName}
                />
                <h4 className="text-white font-sans font-medium text-lg">
                  {twoWay.customerName}
                </h4>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transform ml-auto transition-transform duration-300
                  ${activeIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm mt-1">
                      Round trip from {twoWay.pickupLocation} to {twoWay.dropLocation}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-xs">
                        {formatDistanceToNow(new Date(twoWay.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {activeIndex === index && (
              <div className="border-t border-gray-700/50 p-4 space-y-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img
                    src={twoWay.selectCab.image}
                    alt={twoWay.selectCab.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-white font-sans font-semibold font-xl">
                      {twoWay.selectCab.name}
                    </h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-red-400" />
                        <a
                          href={`mailto:${twoWay.customerEmail}`}
                          className="text-sm underline text-blue-400"
                        >
                          {twoWay.customerEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <a href={`tel:${twoWay.phoneNumber}`} className="text-sm   text-blue-400">
                          {twoWay.phoneNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex  flex-wrap items-center gap-4">
                  {/* Outward Journey */}
                  <div className="bg-gray-800/50 p-3 w-full md:w-1/3  rounded-lg border border-gray-700">
                    <h4 className="text-blue-400 text-sm font-medium mb-2 font-sans">
                      Outward Journey
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">
                          From: {twoWay.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">
                          To: {twoWay.dropLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white" />
                        <span className="text-gray-300 text-sm">
                          Date: {twoWay.pickupDate} at{" "}
                          {formatIndianTime(twoWay.pickupTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Return Journey */}
                  <div className="bg-gray-800/50 p-3 w-full md:w-1/3 rounded-lg border border-gray-700">
                    <h4 className="text-blue-400 text-sm font-sans font-medium mb-2">
                      Return Journey
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">
                          From: {twoWay.dropLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">
                          To: {twoWay.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">
                          Return: {twoWay.returnDate} at{" "}
                          {formatIndianTime(twoWay.returnTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDeleteId(twoWay._id);
                  }}
                  className="flex flex-end items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 
                           bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors "
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
        itemName="this two-way booking"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BookTwoWayNotification;
