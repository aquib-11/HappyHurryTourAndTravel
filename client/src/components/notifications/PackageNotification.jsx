import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import DeleteModal from "../shared/DeleteModal";
import { Trash2, MapPin, Clock, Phone, Calendar, Mail, Users, MessageSquare } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const PackageNotification = ({ bookPackage }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deletePackageNotification = async () => {
    setIsDeleting(true);
    try {
      const res = await customFetch.delete(`/bookPackage/${deleteId}`);
      setIsDeleting(false);
      toast.success("Package notification deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete package notification");
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    deletePackageNotification(deleteId);
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-xl font-semibold text-white mb-6 text-center">
        Package Notifications
      </h4>
      <div className="space-y-4">
        {bookPackage.map((_package, index) => (
          <div
            key={_package._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex items-start gap-4 p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <img
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                src={_package.selectPackage?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  _package.customerName || "Anonymous"
                )}&background=random`}
                alt="Package Image"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-white font-medium text-lg">
                      {_package.selectPackage?.name || "Package Booking"}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Booked by: {_package.customerName}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(_package.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  {!activeIndex === index && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                        setDeleteId(_package._id);
                      }}
                      className="px-3 py-1 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            {activeIndex === index && (
              <div className="border-t border-gray-700/50 p-4 space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">
                        Email: {_package.customerEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">
                        Phone: {_package.customerPhone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">
                        Travel Date: {formatDate(_package.travelDate)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">
                        Adults: {_package.totalAdults} | Children: {_package.totalChildren} | Infants: {_package.totalInfants}
                      </span>
                    </div>
                    {_package.message && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-400 mt-1" />
                        <span className="text-gray-300 text-sm">
                          Message: {_package.message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

               

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDeleteId(_package._id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
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
        itemName="this package notification"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PackageNotification;