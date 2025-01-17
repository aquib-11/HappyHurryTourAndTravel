import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Star,
  MessageCircle,
  CompassIcon,
} from "lucide-react";
import dayjs from "dayjs";

const HotelOverview = ({ hotels }) => {
  const { name, price, rating, description, amenities, createdAt, updatedAt } =
    hotels;

  // Custom icon component for consistent styling
  const AmenityIcon = () => (
    <svg
      className="w-5 h-5 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  return (
    <div className="mt-8">
      {/* Header Section */}
      {/* <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-orange-400" />
          <h2 className="text-3xl font-sans font-bold text-white">{name}</h2>
        </div>
        <p className="text-gray-300">{description}</p>
      </div> */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <CompassIcon />
          <h2 className="text-3xl font-sans font-bold text-white">
            Your Adventure Aminites
          </h2>
        </div>
        <p className="text-gray-300">
          Experience an unforgettable journey across days of carefully crafted
          experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Amenities Section */}
          <div
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-6 backdrop-blur-sm 
                         border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300
                         transform hover:translate-x-2 hover:bg-gray-800/60"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3">
                  <AmenityIcon />
                  <span className="text-gray-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing and Contact Card */}
        <div
          className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl backdrop-blur-sm 
                       border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
        >
          {/* Price Section */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold text-white">${price}</span>
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                per night
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {dayjs(createdAt).format("MMM D")} -{" "}
                {dayjs(updatedAt).format("MMM D, YYYY")}
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Need Assistance?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Call us on</p>
                  <p className="text-white">+91 123 456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Available Hours</p>
                  <p className="text-white">10AM to 7PM</p>
                </div>
              </div>
              <button
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                               rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Request Callback
              </button>
              <button
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                               rounded-full text-blue-400 font-semibold border border-blue-500/50 
                               hover:bg-blue-500/30 transition-colors"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
