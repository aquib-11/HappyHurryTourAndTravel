import React, { lazy, Suspense } from "react";

// Keep the loader as
import { Loader } from "../components";
import Destination from "../Pages/destinations/Destination";

export const destinationsRoutes = [
  {
    path: "/know-about-destination",
    element: <Destination />,
  },
];
