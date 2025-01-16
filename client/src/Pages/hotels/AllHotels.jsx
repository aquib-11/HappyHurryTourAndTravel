import React from "react";
import { AllHotelsBanner, AllHotelsCard } from "../../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
export const allHotelsLoader = async () => {
  const { data } = await customFetch.get("/hotel");
  //   console.log({ data });
  return data;
};
const AllHotels = () => {
  const { hotels } = useLoaderData();
  console.log({ hotelsInAll: hotels });
  const randomImages = hotels
    ?.map((hotel) => hotel.images[1]?.image)
    .filter((image) => image !== null && image !== "" && image !== undefined);
  return (
    <div className="container space-y-5">
      <AllHotelsBanner randomImages={randomImages} />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <AllHotelsCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default AllHotels;
