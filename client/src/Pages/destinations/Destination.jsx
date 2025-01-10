import React, { useState } from "react";

import { ImageSlider, TourDestinationOverview } from "../../components";

const Destination = () => {
  const [heroImage, setHeroImage] = useState(
    "https://img.freepik.com/free-photo/digital-lavender-natural-landscape_23-2150538378.jpg?semt=ais_hybrid"
  );
  const slides = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
    "https://img.freepik.com/free-photo/digital-lavender-natural-landscape_23-2150538378.jpg?semt=ais_hybrid",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
    "https://img.freepik.com/free-photo/digital-lavender-natural-landscape_23-2150538378.jpg?semt=ais_hybrid",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
  ];

  const handleImageHover = (image) => {
    setHeroImage(image);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Beautiful Bali with Malaysia
          </h1>
        </div>

        {/* Images */}
        <ImageSlider
          slides={slides}
          heroImage={heroImage}
          handleImageHover={handleImageHover}
        />

        {/* Overview  */}
        <TourDestinationOverview />
      </div>
    </div>
  );
};

export default Destination;
