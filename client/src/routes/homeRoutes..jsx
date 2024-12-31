import React, { lazy, Suspense } from "react";
import { Loader } from "../components";
import { Home } from "../Pages";

export const homeRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
];
