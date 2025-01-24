import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
dayjs.extend(advancedFormat);

const FeaturedBlog = ({ featuredBlog }) => {
  const date = dayjs(featuredBlog?.createdAt).format("MMM DD, YYYY");
  return (
    <div className="  rounded-[10px] overflow-hidden">
      <div className="relative">
        <img
          src={featuredBlog?.image}
          alt="Woman sitting on beach"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="py-6">
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <h2 className="text-white font-sans  font-bold leading-snug mb-2 line-clamp-2">
          {featuredBlog?.title}
        </h2>

        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${featuredBlog?._id}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
