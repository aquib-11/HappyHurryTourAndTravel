import React, { useState } from "react";

import {
  HotelOverView,
  ImageSlider,
  TourDestinationOverview,
} from "../../components";

import { toast } from "react-toastify";
import { Link, useLoaderData } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import customFetch from "../../utils/customFetch";
import { FaMapMarkerAlt } from "react-icons/fa";

export const getHotelDetailsLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/hotel/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Hotel = () => {
  const user = useHomeLayoutContext();
  console.log({ user });
  const { hotels } = useLoaderData();
  const [heroImage, setHeroImage] = useState(hotels?.images?.[0]?.image);
  const slides = hotels?.images?.map((image) => image.image);

  const handleImageHover = (image) => {
    setHeroImage(image);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen">
      <div className="container  px-4">
        {user.userRole === "admin" && (
          <Link to={`/admin/add-hotel-images/${hotels._id}`}>
            Handle Images
          </Link>
        )}
        {/* Header */}
        <div className="py-6">
          <h1 className="text-4xl font-bold text-white mb-2">{hotels.name}</h1>
          <span
            className="text-blue-500 cursor-pointer flex items-center gap-1"
            onClick={handleModalToggle}
          >
            <FaMapMarkerAlt /> View on map
          </span>
        </div>

        {/* Images */}
        {hotels.images && hotels.images.length > 0 && (
          <ImageSlider
            slides={slides}
            heroImage={heroImage}
            handleImageHover={handleImageHover}
          />
        )}

        {/* Overview  */}
        <HotelOverView hotels={hotels} />
      </div>
      {/* Modal for Location */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-2 rounded w-11/12 md:w-1/4 lg:w-1/5">
            <h3 className="text-lg font-bold">Location</h3>
            <div
              dangerouslySetInnerHTML={{ __html: hotels.location }}
              className="mb-2"
            />
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View on Google Maps
            </a>
            <button className="mt-2 text-red-500" onClick={handleModalToggle}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
