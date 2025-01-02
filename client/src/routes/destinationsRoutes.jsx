import React from "react";

// Keep the loader as

import Destination from "../Pages/destinations/Destination";
import { AllDestination } from "../Pages";
export const destinationsRoutes = [
  {
    path: "/know-about-destination",
    element: <Destination />,
  },
  {
    path: "/all-destinations",
    element: <AllDestination />,
  },
];
