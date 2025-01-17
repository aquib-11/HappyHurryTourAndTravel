import React, { useState } from "react";
import { Clock, Phone, Calendar, MessageSquare } from "lucide-react";
import PackageBookingModel from "./PackageBookingModel";

const PackageBookingCard = ({ price = 280, currency = "$", _package }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className=" max-w-md w-full rounded-xl bg-[var(--bs-card-bg)] backdrop-blur-sm border border-gray-700/50  transition-all">
      <div className="p-4 md:p-6">
        {/* Price Section */}
        <div className="">
          <div className="flex items-end gap-2 mb-3">
            <span className=" text-2xl font-bold text-white">
              {formatPrice(price)}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/20">
              Best Value
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/20">
              Instant Booking
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="my-4 space-y-2">
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full bg-[--bs-blur-bg] transition-colors duration-200 hover:bg-purple-700 hover:text-white text-[var(--bs-text)] px-6 py-3 rounded-lg font-bold "
          >
            Book Now
          </button>
          <button className="w-full border border-gray-700 bg-gray-900/50 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
            Send Inquiry
          </button>
        </div>

        {/* Help Section */}
        <div className=" border-t border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer bg-gray-900/50 hover:bg-gray-900/70 border border-gray-700 p-4 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Call us on</p>
                <p className="font-medium text-white">+91 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer bg-gray-900/50 hover:bg-gray-900/70 border border-gray-700 p-4 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Available Hours</p>
                <p className="font-medium text-white">10 AM to 7 PM</p>
              </div>
            </div>

            <button className="flex items-center gap-3 w-full bg-gray-900/50 hover:bg-gray-900/70 border border-gray-700 p-4 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-sm text-gray-400">Schedule</p>
                <p className="font-medium text-white">Request Callback</p>
              </div>
            </button>

            <button className="flex items-center gap-3 w-full bg-gray-900/50 hover:bg-gray-900/70 border border-gray-700   p-4 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-sm text-gray-400">Support</p>
                <p className="font-medium text-white">Chat with Us</p>
              </div>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="  border-t border-gray-700/50 my-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-blue-400" />
              Instant Confirmation
            </span>
            <span className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              24/7 Support
            </span>
          </div>
        </div>
      </div>
      {showBookingModal && (
        <PackageBookingModel
          showBookingModal={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          _package={_package}
        />
      )}
    </div>
  );
};

export default PackageBookingCard;
