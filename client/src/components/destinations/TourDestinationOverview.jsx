import { CompassIcon } from "lucide-react";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ListMapStyles from "../shared/ListMapStyles";
import OverViewTile from "../shared/OverViewTile";
const TourDestinationOverview = ({ destination }) => {
  const {
    destinationName,
    title,
    images,
    overview,
    _id,
    highlights,
    updatedAt,
  } = destination;
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
      {/* Left Section */}
      <div className="md:col-span-2">
        <OverViewTile title={title} icon={<CompassIcon />} />
        <p className="text-gray-300 mb-6">{overview}</p>
        <ListMapStyles iteratorItems={highlights} />
      </div>

      {/* Right Section */}
      <div className="bg-gray-800 p-6 rounded-lg h-fit">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold">$280</span>
            <span className="text-sm text-gray-400">/person</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-400">(365 reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
            Book Now
          </button>
          <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded">
            Send Inquiry
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <AiOutlinePhone className="w-5 h-5 text-indigo-600" /> */}
              <div>
                <p className="text-sm">Call us on</p>
                <p>+91 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <AiOutlineClockCircle className="w-5 h-5 text-indigo-600" /> */}
              <div>
                <p className="text-sm">Timing</p>
                <p>10AM to 7PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <AiOutlineCalendar className="w-5 h-5 text-indigo-600" /> */}
              <p>Let Us Call You</p>
            </div>
            <div className="flex items-center gap-3">
              {/* <AiOutlineSchedule className="w-5 h-5 text-indigo-600" /> */}
              <p>Book Appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDestinationOverview;
