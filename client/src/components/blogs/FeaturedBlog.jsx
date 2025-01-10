import { Calendar } from "lucide-react";

const FeaturedBlog = () => {
  return (
    <div className="max-w-md mx-auto rounded-[10px] overflow-hidden">
      <div className="relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
          alt="Woman sitting on beach"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="py-6">
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>April 28, 2022</span>
        </div>
        <h2 className="text-white text-lg font-bold leading-snug mb-2 line-clamp-2">
          7 common mistakes everyone makes while traveling
        </h2>

        <div className="flex items-center justify-between">
          <button className="text-sm text-blue-400 hover:underline">
            Read more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
