import React from "react";
import { BlogsGrid } from "../Pages";
import { SingleBlog } from "../components";

export const blogRoutes = [
  {
    path: "/blog-grid",
    element: <BlogsGrid />,
  },
  {
    path: "/blog",
    element: <SingleBlog />,
  },
];
