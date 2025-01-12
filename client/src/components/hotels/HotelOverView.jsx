import React, { useState } from "react";
import dayjs from "dayjs";
import { FaLongArrowAltRight } from "react-icons/fa";

const HotelOverView = ({ hotels }) => {
  const {
    name,
    location,
    price,
    rating,
    description,
    images,
    amenities,
    createdAt,
    updatedAt,
  } = hotels;



  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
      {/* Left Section */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
      
        <p className="text-gray-300 mb-6">{description}</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {amenities.map((amenity) => (
                <li className="flex items-center gap-2" key={amenity}>
                  <FaLongArrowAltRight /> {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-gray-800 p-6 rounded-lg h-fit">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-sm text-gray-400">/night</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-400">
              ({dayjs(createdAt).format("MMMM D, YYYY")} -{" "}
              {dayjs(updatedAt).format("MMMM D, YYYY")})
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm">Call us on</p>
                <p>+91 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm">Timing</p>
                <p>10AM to 7PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p>Let Us Call You</p>
            </div>
            <div className="flex items-center gap-3">
              <p>Book Appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverView;
