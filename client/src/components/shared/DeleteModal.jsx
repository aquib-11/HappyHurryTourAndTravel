import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded w-11/12 md:w-1/3">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete {itemName}?</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button className="bg-gray-300 p-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
