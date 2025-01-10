import React, { lazy, Suspense } from "react";
import { Loader } from "../components";
import { destinationsRoutes } from "./destinationsRoutes";
import { homeRoutes } from "./homeRoutes.";
const HomeOutlet = lazy(() => import("../outlets/HomeOutlet"));

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <HomeOutlet />
      </Suspense>
    ),
    // Routes that need homeOutlet, meaning pages that need header and footer
    children: [...homeRoutes, ...destinationsRoutes],
  },
  // Routes that dont need the header and footer
  // ...destinationsRoutes,
];
