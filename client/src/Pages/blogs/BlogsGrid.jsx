import React, { useEffect } from "react";
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
  const featuredBlog = data[data.length - 1];
  const filteredBlogs = data.filter((data) => data._id !== featuredBlog._id);
  const recentBlogs = filteredBlogs.slice(-3);
  if(data.length === 0) {
    return (
      <div className="container text-center py-20">
      <h1 className="text-4xl font-bold font-sans mb-4">No Blogs Listed Yet</h1>
      <p className="text-lg text-gray-500 mb-8">
        There are currently no blogs available. Please check back later or try refreshing the page.
      </p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
      </div>
    );
}
  return (
    <section className="min-h-screen py-12 container">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <FeaturedBlog featuredBlog={featuredBlog} />
          </div>
          <div className="md:col-span-1">
            <RecentBlogs recentBlogs={recentBlogs} />
          </div>
        </div>
      </div>
      <div className="py-12">
        <h2 className="text-4xl font-sans font-bold text-white text-center mb-12">
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
    </section>
  );
};

export default BlogGrid;
