import React, { useState } from "react";

import { ImageSlider, TourDestinationOverview } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

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
  console.log({ dataB: data.destinations });
  const [heroImage, setHeroImage] = useState(
    data?.destinations?.images?.[0]?.image
  );
  const slides = data?.destinations?.images?.map((image) => image.image);

  const handleImageHover = (image) => {
    setHeroImage(image);
  };

  return (
    <div className="min-h-screen">
      <div className="container  px-4">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            {data?.destinations?.title}
          </h1>
        </div>

        {/* Images */}
        <ImageSlider
          slides={slides}
          heroImage={heroImage}
          handleImageHover={handleImageHover}
        />

        {/* Overview  */}
        <TourDestinationOverview destination={data?.destinations} user={user} />
      </div>
    </div>
  );
};

export default Destination;
