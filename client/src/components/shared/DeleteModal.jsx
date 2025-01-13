import React from "react";
import { Loader2 } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative md:w-full max-w-md rounded-xl bg-[var(--bs-card-bg)] p-6 shadow-lg mx-auto w-[90%]">
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-[var(--bs-white)]">
            Confirm Deletion
          </h3>
          <p className="text-[var(--bs-gray-400)]">
            Are you sure you want to delete {itemName}? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-[var(--bs-white)] transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
