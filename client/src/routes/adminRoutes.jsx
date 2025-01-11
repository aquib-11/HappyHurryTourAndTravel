import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminOutlet from "../outlets/AdminOutlet";
import { AddDestination, AddDestinationImages } from "../Pages";
import { addDestinationAction } from "../Pages/admin/AddDestination";
import {
  deleteImageAction,
  uploadDestinationImagesAction,
  uploadDestinationImagesLoader,
} from "../Pages/admin/AddDestinationImages";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminOutlet />,
    children: [
      {
        path: "add-destination",
        element: <AddDestination />,
        action: addDestinationAction,
      },
      {
        path: "add-destination-images/:id",
        element: <AddDestinationImages />,
        action: uploadDestinationImagesAction,
        loader: uploadDestinationImagesLoader,
      },
      {
        path: "delete-destination-image/:id/:imageId",
        action: deleteImageAction,
      },
    ],
  },
];
