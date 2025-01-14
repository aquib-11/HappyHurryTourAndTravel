import React from "react";
import {
  AllLatestblogsCard,
  FeaturedBlog,
  RecentBlogs,
} from "../../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
export const allBlogsloader = async () => {
  try {
    const { data } = await customFetch.get("/blog");
    return data;
  } catch (error) {
    return error;
  }
};
// Main Blog Page Component
const BlogGrid = () => {
  const data = useLoaderData();
  return (
    <section className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          The Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <FeaturedBlog />
          </div>
          <div className="md:col-span-1">
            <RecentBlogs />
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Latest Article
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((blog) => (
              <div key={blog._id}>
                <AllLatestblogsCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
