import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
const ImageSlider = ({ slides, heroImage, handleImageHover }) => {
  return (
    <div>
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
                  onMouseEnter={() => handleImageHover(slide)}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ImageSlider;
