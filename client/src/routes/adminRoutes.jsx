import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminOutlet from "../outlets/AdminOutlet";
import {
  AddBlogs,
  AddCab,
  AddDestination,
  AddDestinationImages,
  AddDestinationPricing,
  AddHotel,
  EditBlog,
  EditCabPrice,
  EditDestination,
} from "../Pages";
import { addDestinationAction } from "../Pages/admin/AddDestination";
import {
  uploadDestinationImagesAction,
  uploadDestinationImagesLoader,
} from "../Pages/admin/AddDestinationImages";
import {
  editDestinationAction,
  editDestinationLoader,
} from "../Pages/admin/editPages/EditDestination";
import { addHotelAction } from "../Pages/admin/hotels/AddHotel";
import AddHotelImages, {
  uploadHotelImagesAction,
  uploadHotelImagesLoader,
} from "../Pages/admin/hotels/AddHotelImages";
import EditHotel, {
  editHotelAction,
  editHotelLoader,
} from "../Pages/admin/editPages/EditHotel";
import { addCabAction } from "../Pages/admin/cabs/AddCab";
import EditCab, {
  editCabAction,
  editCabLoader,
} from "../Pages/admin/editPages/EditCab";
import { editCabPriceLoader } from "../Pages/admin/editPages/EditCabPrice";
<<<<<<< Updated upstream
import { editBlogLoader } from "../Pages/admin/editPages/EditBlog";
=======
import AddTourPackage, { addTourpackageAction } from "../Pages/admin/AddTourPackage";
>>>>>>> Stashed changes

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
        path: "edit-destination/:id",
        element: <EditDestination />,
        action: editDestinationAction,
        loader: editDestinationLoader,
      },

      {
        path: "add-hotel",
        element: <AddHotel />,
        action: addHotelAction,
      },
      {
        path: "add-hotel-images/:id",
        element: <AddHotelImages />,
        action: uploadHotelImagesAction,
        loader: uploadHotelImagesLoader,
      },
      {
        path: "edit-hotel/:id",
        element: <EditHotel />,
        action: editHotelAction,
        loader: editHotelLoader,
      },
      {
        path: "add-cab",
        element: <AddCab />,
        action: addCabAction,
      },
      {
        path: "edit-cab/:id",
        element: <EditCab />,
        action: editCabAction,
        loader: editCabLoader,
      },
      {
        path: "add-cab-pricing",
        element: <AddDestinationPricing />,
      },
      {
        path: "edit-cab-pricing/:id",
        element: <EditCabPrice />,
        loader: editCabPriceLoader,
      },
<<<<<<< Updated upstream

      {
        path: "add-blog",
        element: <AddBlogs />,
      },
      {
        path: "edit-blog/:id",
        element: <EditBlog />,
        loader: editBlogLoader,
=======
      {
        path: "add-tour-package",
        element: <AddTourPackage />,
        action: addTourpackageAction,
>>>>>>> Stashed changes
      },
    ],
  },
];
