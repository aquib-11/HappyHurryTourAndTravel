import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const TourDestinationOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
      {/* Left Section */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-300 mb-6">
          Bali, also known as the land of gods has plenty to offer to travelers
          from across the globe. As is so contrasted an estimating instrument.
          Size like body some one had. Are conduct viewing boy minutes warrant
          the exposure? Tolerably behavior may admit daughters offending her ask
          own. These effect wishes change very and any wanted. Lady yet looked
          either regard had.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Tour Highlights</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight /> Experience a delightful tropical getaway
                with a luxurious stay and witness the picture-perfect beaches,
                charming waterfalls and so much more
              </li>
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight /> Dependent on so extremely delivered by.
                Yet no jokes worse her why.
              </li>
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight />
                Whatever boy her exertion his extended.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              More About The Beautiful Bali with Malaysia Tour
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight />
                Guidelines issued by the State Government are to be followed.
                Social distancing to be maintained. Frequent hand sanitization
                and use of mask recommended.
              </li>
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight />
                No guide as fully me or point. Kindness owns whatever betrayed
                her moreover procured replying for and.
              </li>
              <li className="flex items-center gap-2">
                <FaLongArrowAltRight />
                International / Domestic flights are not included in the
                package.
              </li>
            </ul>
          </div>
        </div>
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
