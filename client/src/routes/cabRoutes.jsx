import React from "react";
import { CabHome } from "../Pages";
import { cabHomeLoader } from "../Pages/Cab/CabHome";
export const cabRoutes = [
  {
    element: <CabHome />,
    path: "/cab-home",
    loader: cabHomeLoader,
  },
];
