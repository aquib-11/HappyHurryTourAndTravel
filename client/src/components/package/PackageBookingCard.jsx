import React from "react";

const PackageBookingCard = ({ _package }) => {
  console.log({ _package });
  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg h-fit">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold">$280</span>
            <span className="text-sm text-gray-400">/person</span>
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

export default PackageBookingCard;
