import React from "react";

// Keep the loader as

import Destination, {
  getDestinationDetailsLoader,
} from "../Pages/destinations/Destination";
import { AllDestination } from "../Pages";
import { allDestinationLoader } from "../Pages/destinations/AllDestination";
export const destinationsRoutes = [
  {
    path: "/know-about-destination/:id",
    element: <Destination />,
    loader: getDestinationDetailsLoader,
  },
  {
    path: "/all-destinations",
    element: <AllDestination />,
    loader: allDestinationLoader,
  },
];
