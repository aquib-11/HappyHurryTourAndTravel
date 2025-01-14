import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import DeleteModal from "../shared/DeleteModal";
dayjs.extend(advancedFormat);
const AllDestinationCard = ({ destination }) => {
  const {
    destinationName,
    title,
    images,
    overview,
    _id,
    highlights,
    updatedAt,
  } = destination;
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const createDate = dayjs(updatedAt).format("MMM DD, YYYY");
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const navigate = useNavigate();
  const deleteDestination = async () => {
    setIsModalOpen(false);
    try {
      setIsDeleting(true);
      await customFetch.delete(`/destination/${_id}`);
      toast.success("Destination deleted successfully");
      navigate("/all-destinations");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };
  const confirmDelete = () => {
    deleteDestination();
  };
  const coverImage =
    images[randomImageIndex]?.image ||
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  return (
    <div className="container bg-transparent text-center p-2 mt-6 ">
      <img
        src={coverImage}
        alt={title}
        className="rounded-full w-36 h-36 mx-auto object-cover"
      />
      <div className=" p-0 pt-3">
        <h1 className="font-extrabold text-xl text-[var(--bs-white)]">
          <Link
            className="hover:text-[var(--bs-link-color)] transition-colors duration-300"
            to={`/know-about-destination/${_id}`}
          >
            {destinationName}
          </Link>
        </h1>
        <p className="text-[var(--bs-gray-400)]">{createDate}</p>
      </div>
      {user?.userRole === "admin" && (
        <div>
          <Link
            to={`/admin/edit-destination/${_id}`}
            className="text-[var(--bs-link-color)] transition-colors duration-300 hover:text-[var(--bs-link-hover-color)]"
          >
            Edit
          </Link>
          <button onClick={() => setIsModalOpen(true)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName="this destination"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AllDestinationCard;
