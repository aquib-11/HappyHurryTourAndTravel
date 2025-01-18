import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import DeleteModal from "../shared/DeleteModal";
import { Trash2, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PackageNotification = ({ bookPackage }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deletePackageNotification = async (id) => {
    setIsDeleting(true);
    try {
      const res = await customFetch.delete(`/packages/${id}`);

      if (res.status === 200) {
        setIsDeleting(false);
        toast.success("Package notification deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete package notification");
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete package notification");
    }
  };

  const confirmDelete = () => {
    deletePackageNotification(deleteId);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <h4 className="text-xl font-semibold text-white mb-6 text-center">
        Package Notifications
      </h4>
      <div className="space-y-2">
        {bookPackage.map((_package, index) => (
          <div
            key={_package._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex items-start gap-4 p-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <img
                className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  _package.customerName || "Anonymous"
                )}&background=random`}
                alt="User Avatar"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-sm md:text-xl">
                      {_package.customerName}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-base mb-0">
                      {_package.customerName} booked a package for
                      destination {_package.dropLocation} for {_package.pickupDate} at {_package.pickupTime}
                    </p>
                    <span className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(_package.createdAt), {
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
                          setDeleteId(_package._id);
                        }}
                        className="px-4 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {activeIndex === index && (
              <div className="border-t border-gray-700/50 space-y-4 p-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm md:text-xl">To: {_package.dropLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm md:text-xl">At: {_package.pickupTime}</span>
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
