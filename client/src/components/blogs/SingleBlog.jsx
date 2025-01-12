import React from "react";
import img from "../../assets/images/bg6.jpg";

const SingleBlog = () => {
  return (
    <div className="container relative ">
      {/* Background Image */}
      <div className="w-full h-[400px] relative">
        <img
          src={img}
          alt="Mountain landscape"
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Dark Overlay Card */}
        <div className="absolute -bottom-20 left-0 right-0 bg-black p-6 text-white w-[90%] md:w-[80%] mx-auto rounded-xl">
          {/* Hotel Service Tag */}
          <div className="mb-2">
            <span className="text-teal-400 bg-[#20c99647] text-sm p-2 rounded-md">
              Hotel service
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold mb-4 font-sans ">
            Bad habits that people in the business industry need to quit
          </h1>

          <div className="flex items-center text-sm md:text-base gap-2">
            <span className="font-medium">Lori Stevens</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Nov 15, 2022</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">5 min read</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto p-6 mt-20">
        <div className=" mx-auto">
          <h1 className="text-[var(--bs-white)] font-sans font-bold  mb-4 ">Blog title</h1>
          <p className="text-[var(--bs-white)] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
