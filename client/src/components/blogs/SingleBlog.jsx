import React from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "../../assets/Css/SingleBlog.css";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
dayjs.extend(advancedFormat);
export const singleBlogLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/blog/${params.id}`);
    return data;
  } catch (error) {
    return error;
  }
};
const SingleBlog = () => {
  const date = dayjs().format("MMM DD, YYYY");
  const data = useLoaderData();
  const { user } = useHomeLayoutContext();
  const _tags = JSON.parse(data.tags);
  return (
    <div className="container relative ">
      {/* Background Image */}
      <div className="w-full h-[400px] relative">
        <img
          src={data.image}
          alt="Mountain landscape"
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Dark Overlay Card */}
        <div className="absolute -bottom-20 left-0 right-0 bg-black p-6 text-white w-[90%] md:w-[80%] mx-auto rounded-xl">
          {/* Hotel Service Tag */}
          <div className="mb-2">
            {_tags.map((tag) => (
              <span
                key={tag}
                className="text-teal-400 bg-[#20c99647] text-sm p-2 rounded-md mr-2"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-bold mb-4 font-sans ">{data.title}</h1>

          <div className="flex items-center text-sm md:text-base gap-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">5 min read</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto p-6 mt-20">
        <div className=" mx-auto">
          <div
            className="min-h-[300px] p-2 rounded blog-body"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
