import React from "react";
import { BlogsGrid } from "../Pages";
import { SingleBlog } from "../components";
import { allBlogsloader } from "../Pages/blogs/BlogsGrid";
import { singleBlogLoader } from "../components/blogs/SingleBlog";

export const blogRoutes = [
  {
    path: "/blog-grid",
    element: <BlogsGrid />,
    loader: allBlogsloader,
  },
  {
    path: "/blog/:id",
    element: <SingleBlog />,
    loader: singleBlogLoader,
  },
];
