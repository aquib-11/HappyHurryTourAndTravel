import React from "react";
import {
  AllDestinaitonBanner,
  AllHotelsBanner,
  AllHotelsCard,
} from "../../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
export const allHotelsLoader = async () => {
  const { data } = await customFetch.get("/hotel");
  //   console.log({ data });
  return data;
};
const AllHotels = () => {
  const { hotels } = useLoaderData();

  return (
    <div className="container space-y-5">
      <AllDestinaitonBanner
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgF09vuD2UIy9bQh6G9g2j4fPN0TbkG3u5Q&s"
        title="All Hotels"
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <AllHotelsCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default AllHotels;
