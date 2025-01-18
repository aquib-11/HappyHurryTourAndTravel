import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Star,
  MessageCircle,
  CompassIcon,
  IterationCcw,
  Hotel,
} from "lucide-react";
import dayjs from "dayjs";
import ListMapStyles from "../shared/ListMapStyles";
import OverViewTile from "../shared/OverViewTile";

const HotelOverview = ({ hotels }) => {
  const { amenities } = hotels;

  return (
    <div className="mt-8">
      <OverViewTile
        title="Your Adventure Aminites"
        description="Experience an unforgettable journey across days of carefully crafted
          experiences"
        icon={<Hotel />}
      />
      
      <p className="font-sans">{hotels?.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ListMapStyles iteratorItems={amenities} />
        {/* Main Content Section */}
      </div>
    </div>
  );
};

export default HotelOverview;
