import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Bell, } from "lucide-react";
import customFetch from "../../../utils/customFetch";
import {
  BookOneWayNotification,
  BookTwoWayNotification,
  ContactNotfication,
  PackageNotification,
} from "../../../components";

export const notificationLoader = async () => {
  try {
    const [response1, response2, response3, response4] = await Promise.all([
      customFetch.get("/bookOneWay"),
      customFetch.get("/bookTwoWay"),
      customFetch.get("/contact"),
      customFetch.get("/bookPackage"),
    ]);

    return {
      bookOneWay: response1.data,
      bookTwoWay: response2.data,
      contact: response3.data,
      bookPackage: response4.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Notification = () => {
  const data = useLoaderData();
  const [selectedFilter, setSelectedFilter] = useState("all");


  // Calculate total notifications
  const totalNotifications =
    (data?.bookOneWay?.length || 0) +
    (data?.bookTwoWay?.length || 0) +
    (data?.contact?.length || 0) +
    (data?.bookPackage?.length || 0);

  const filters = [
    { id: "all", label: "All" },
    { id: "oneWayBookings", label: "One Way" },
    { id: "twoWayBookings", label: "Two way" },
    { id: "contacts", label: "Contacts" },
    { id: "packages", label: "Packages" },
  ];

  const showSection = (type) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "oneWayBookings" && type === "bookOneWay")
      return true;
    if (selectedFilter === "twoWayBookings" && type === "bookTwoWay")
      return true;
    if (selectedFilter === "contacts" && type === "contacts") return true;
    if (selectedFilter === "packages" && type === "bookPackage") return true;
    return false;
  };

  return (
    <div className="md:px-4 ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-1 md:p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-400" />
            <h4 className=" font-bold text-white font-sans">Notifications</h4>
          </div>
          <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
            Total {totalNotifications}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="relative flex items-center gap-2 w-full mb-6">
        <label className="block text-gray-300 text-sm font-medium ">
          Filter by:
        </label>
        <div className="relative w-[70%] ">
          <select
            className="block w-full px-4 py-1 text-sm font-medium bg-gray-800 text-gray-200 border border-gray-600 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option
              value="all"
              className="bg-gray-800 text-gray-200 rounded-md"
            >
              All Notifications
            </option>
            {filters.map((filter) => (
              <option
                key={filter.id}
                value={filter.id}
                className="bg-gray-800 text-gray-200 rounded-md"
              >
                {filter.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Notifications Container */}
      <div className="space-y-6">
        {/*One way Bookings Section */}
        {(showSection("bookOneWay") && data?.bookOneWay?.length > 0) && (
          <div
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-2
                        backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 
                        transition-all duration-300"
          >
            <BookOneWayNotification bookOneWay={data.bookOneWay} />
          </div>
        )}

        {(showSection("bookTwoWay") && data?.bookTwoWay?.length > 0) && (
          <div
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-2 
                        backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 
                        transition-all duration-300"
          >
            <BookTwoWayNotification bookTwoWay={data.bookTwoWay} />
          </div>
        )}

      

        {/* Packages Section */}
        {showSection("bookPackage") && data?.bookPackage?.length > 0 && (
          <div
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-x l p-2
                        backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 
                        transition-all duration-300"
          >
            <PackageNotification bookPackage={data.bookPackage} />
          </div>
        )}
          {/* Contacts Section */}
          {showSection("contacts") && data?.contact?.length > 0 && (
          <div
            className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-2
                        backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 
                        transition-all duration-300"
          >
            <ContactNotfication contact={data.contact} />
          </div>
        )}

        {/* Empty State */}
        {totalNotifications === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No New Notifications
            </h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
