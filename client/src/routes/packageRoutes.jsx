import React from "react";
import { AllPackages, PackageOverview,PackageIterinary, PackageMore,InclusionExclusion } from "../Pages";
import { allPackageLoader } from "../Pages/package/AllPackages";
import  Package, { packageloader } from "../outlets/Package";

export const packageRoutes = [
  {
    element: <AllPackages />,
    path: "/all-packages",
    loader: allPackageLoader,
  },
  {
    element: <Package />,
    path: "/package/:id",
    loader: packageloader,
    children: [
      {
        index: true,
        element: <PackageOverview />,
      },
      {
        path: "iterinary",
        element: <PackageIterinary />,
      },
      {
        path: "more",
        element: <PackageMore />,
      },
      {
        path: "inclusions-and-exclusions",
        element: <InclusionExclusion />,
      },
    ],
  }
];
