import React, { useState } from "react";

import { ImageSlider, TourDestinationOverview } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { Link, useLoaderData } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { FaPlus } from "react-icons/fa";

export const getDestinationDetailsLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/destination/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Destination = () => {
  const data = useLoaderData();
  const { user } = useHomeLayoutContext();

  const [heroImage, setHeroImage] = useState(
    data?.destinations?.images?.[0]?.image
  );
  const slides = data?.destinations?.images?.map((image) => image.image);

  const handleImageHover = (image) => {
    setHeroImage(image);
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="py-6 justify-between block md:flex">
          <h1 className="text-4xl font-bold text-white mb-2">
            {data?.destinations?.title}
          </h1>
          {user?.userRole === "admin" && (
            <Link
              to={`/admin/add-destination-images/${data?.destinations?._id}`}
              className="flex items-center justify-center bg-[var(--bs-black)] text-[var(--bs-white)] font-semibold py-3 p-4 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors"
            >
              Handle Images
              <FaPlus className="ms-2"></FaPlus>
            </Link>
          )}
        </div>

        {/* Images */}
        {slides && slides.length > 0 && (
          <ImageSlider
            slides={slides}
            heroImage={heroImage}
            handleImageHover={handleImageHover}
          />
        )}

        {/* Overview  */}
        <TourDestinationOverview destination={data?.destinations} />
      </div>
    </div>
  );
};

export default Destination;
