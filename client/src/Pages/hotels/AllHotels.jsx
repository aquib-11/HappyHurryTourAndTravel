import React from "react";
import {
  AllDestinaitonBanner,
  AllHotelsBanner,
  AllHotelsCard,
} from "../../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { MdDangerous } from "react-icons/md";
export const allHotelsLoader = async () => {
  const { data } = await customFetch.get("/hotel");
  //   console.log({ data });
  return data;
};
const AllHotels = () => {
  const { hotels } = useLoaderData();
  if (hotels.length === 0) {
    return (
      <div className="container text-center py-20">
        <h1 className="text-4xl font-bold font-sans mb-4">
          No Hotels Listed Yet
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          There are currently no hotels available. Please check back later or
          try refreshing the page.
        </p>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }
  return (
    <div className="container space-y-5">
      <AllDestinaitonBanner
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgF09vuD2UIy9bQh6G9g2j4fPN0TbkG3u5Q&s"
        title="All Hotels"
      />
      <p className="flex items-center gap-2 p-5 text-base font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all duration-300 ease-in-out">
        The hotels listed on our website are not owned or managed by us. They
        are included in our packages for your convenience. All hotel services
        and policies are the responsibility of the respective hotel management.
       
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <AllHotelsCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default AllHotels;
