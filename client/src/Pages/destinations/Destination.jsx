import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { TourDestinationOverview } from "../../components";

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

  const handleImageClick = (image) => {
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
          <p className="text-gray-300">
            5 nights - 6 Days • 1 Country - 2 Cities
          </p>
        </div>
        {/* Hero Image */}
        <div className="relative sm:h-[200px] md:h-[600px] mb-8 rounded-lg overflow-hidden ">
          <img
            src={heroImage}
            alt="Wat Arun at night"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Slider */}
        <div className="mb-8">
          <Splide
            options={{
              perPage: 4,
              gap: "1rem",
              pagination: false,
              arrows: true,
              rewind: true,
              breakpoints: {
                640: { perPage: 2 },
                768: { perPage: 2 },
                1024: { perPage: 3 },
              },
            }}
          >
            {slides.map((slide, index) => (
              <SplideSlide key={index}>
                <div className="sm:h-[3rem] cursor-pointer md:h-48 rounded-lg overflow-hidden  border-[var(--bs-primary)] hover:border-[6px] transition-transform duration-300 ease-in-out">
                  <img
                    src={slide}
                    alt={`Travel destination ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    onMouseEnter={() => handleImageClick(slide)}
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        {/* Overview  */}
        <TourDestinationOverview />
      </div>
    </div>
  );
};

export default Destination;
