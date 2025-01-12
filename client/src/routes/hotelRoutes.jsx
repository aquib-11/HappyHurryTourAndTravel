import React from "react";
import { AllHotels } from "../Pages";
import { allHotelsLoader } from "../Pages/hotels/AllHotels";
import Hotel, { getHotelDetailsLoader } from "../Pages/hotels/Hotel";

export const hotelRoutes = [
  {
    path: "/all-hotels",
    element: <AllHotels />,
    loader: allHotelsLoader,
  },
  {
    path: "/know-about-hotel/:id",
    element: <Hotel />,
    loader: getHotelDetailsLoader,
  },
];
