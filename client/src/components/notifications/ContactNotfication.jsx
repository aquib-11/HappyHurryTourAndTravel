import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import DeleteModal from "../shared/DeleteModal";
import { Trash2, MessageSquare, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ContactNotification = ({ contact }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deleteContactNotification = async (id) => {
    setIsDeleting(true);
    try {
      const res = await customFetch.delete(`/contacts/${id}`);

      if (res.status === 200) {
        setIsDeleting(false);
        toast.success("Contact notification deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete contact notification");
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete contact notification");
    }
  };

  const confirmDelete = () => {
    deleteContactNotification(deleteId);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <h4 className="text-xl font-semibold text-white mb-6 text-center">
        Contact Notifications
      </h4>
      <div className="space-y-2">
        {contact.map((singleContact, index) => (
          <div
            key={singleContact._id}
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="flex items-start gap-4 p-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <img
                className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  singleContact.name || "Anonymous"
                )}&background=random`}
                alt="User Avatar"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-sm md:text-xl font-sans">
                      {singleContact.name}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-base mb-0 line-clamp-1">
                      {singleContact.message}
                    </p>
                    <span className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(singleContact.createdAt), {
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
                          setDeleteId(singleContact._id);
                        }}
                        className="px-4 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300
                  ${activeIndex === index ? "rotate-180" : ""}`}
              />
            </div>
            {activeIndex === index && (
              <div className="border-t border-gray-700/50 space-y-4 p-2 text-sm md:text-xl">
                <div className="flex flex-col sm:flex-row  sm:gap-12">
                  <p>
                    Email:{" "}
                    <span className="text-gray-400">{singleContact.email}</span>
                  </p>
                  <p>
                    Phone:{" "}
                    <span className="text-gray-400">{singleContact.phone}</span>
                  </p>
                </div>
                <p>
                  Message:{" "}
                  <span className="text-gray-400">{singleContact.message}</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDeleteId(singleContact._id);
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
        itemName="this contact notification"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ContactNotification;
