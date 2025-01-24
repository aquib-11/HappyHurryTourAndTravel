import { CompassIcon } from "lucide-react";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ListMapStyles from "../shared/ListMapStyles";
import OverViewTile from "../shared/OverViewTile";
import { Link } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
const TourDestinationOverview = ({ destination }) => {
  const {user} = useHomeLayoutContext();
  console.log({user});
  
  const {
    destinationName,
    title,
    images,
    overview,
    _id,
    highlights,
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
      <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg h-fit">


        <div className="flex flex-col gap-4">
          <Link to='/all-packages' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded block text-center">
            Book Tour
          </Link>
          <Link to='/contact' className="w-full text-center border border-indigo-600 text-indigo-600 py-2 px-4 rounded">
            Contact-Us
          </Link>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold font-sans mb-4">Need Help?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <AiOutlinePhone className="w-5 h-5 text-indigo-600" /> */}
              <div>
                <p className="text-sm">Call us on</p>
                <a href={`tel:+91${user?.adminDetail?.phone}`}>+91-{user?.adminDetails?.phone}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <AiOutlineClockCircle className="w-5 h-5 text-indigo-600" /> */}
              <div>
                <p className="text-sm">Timing</p>
                <p>24/7 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDestinationOverview;
