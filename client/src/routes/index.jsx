import React, { lazy, Suspense } from "react";
import { Loader } from "../components";
import { destinationsRoutes } from "./destinationsRoutes";
import { homeRoutes } from "./homeRoutes.";
import { blogRoutes } from "./blogRoutes";
import { authRoutes } from "./authRoutes";
import { homeLayoutLoader } from "../outlets/HomeOutlet";
import { cabRoutes } from "./cabRoutes";
import { adminRoutes } from "./adminRoutes";
import { hotelRoutes } from "./hotelRoutes";
import { packageRoutes } from "./packageRoutes";

const HomeOutlet = lazy(() => import("../outlets/HomeOutlet"));

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <HomeOutlet />
      </Suspense>
    ),
    loader: homeLayoutLoader,
    // Routes that need homeOutlet, meaning pages that need header and footer

    children: [
      ...homeRoutes,
      ...destinationsRoutes,
      ...blogRoutes,
      ...adminRoutes,
      ...cabRoutes,
      ...hotelRoutes,
      ...packageRoutes,
    ],
  },
  // Routes that dont need the header and footer
  // ...destinationsRoutes,
  ...authRoutes,
];
