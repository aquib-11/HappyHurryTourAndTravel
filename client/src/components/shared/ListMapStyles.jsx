import {
  ArrowBigRight,
  Calendar,
  Clock,
  IterationCcw,
  MessageCircle,
  Phone,
} from "lucide-react";
import React from "react";

const ListMapStyles = ({ iteratorItems }) => {
  return (
    <div>
      {/* Main Content Section */}
      <div className="space-y-4">
        {iteratorItems.map((item, index) => (
          <div key={item} className="relative pl-8 md:pl-12 group">
            {/* Animated timeline line */}
            {index !== iteratorItems.length - 1 && (
              <div className="absolute left-4 md:left-6 top-12 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
            )}

            {/* Animated day number */}
            <div className="absolute left-0 md:left-2 top-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-bold">{index + 1}</span>
            </div>

            {/* Content Card */}
            <div className="relative ml-4 group">
              {/* Day indicator */}
              <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-white/10 transform -translate-y-1/2 group-hover:scale-150 transition-transform duration-300"></div>

              <div
                className="bg-[var(--bs-card-bg)] rounded-xl p-6 backdrop-blur-sm 
                             transform transition-all duration-300 hover:translate-x-2 hover:bg-gray-800/60
                             border border-gray-700/50 hover:border-blue-500/50 group"
              >
                {/* Itinerary Content */}
                <div className="flex items-start gap-3">
                  <ArrowBigRight />
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {item}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing and Contact Card */}
    </div>
  );
};

export default ListMapStyles;
