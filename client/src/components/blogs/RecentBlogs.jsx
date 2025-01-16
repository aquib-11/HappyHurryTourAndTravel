import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
dayjs.extend(advancedFormat);

// Recent Posts Component
const RecentBlogs = ({ recentBlogs }) => {
  const posts = [
    {
      id: 1,
      title: "Bad habits that people in the business industry need to quit",
      date: "Sep 01, 2022",
      image:
        "https://cdn.pixabay.com/photo/2025/01/07/16/56/sand-9317325_1280.jpg",
    },
    {
      id: 2,
      title: "Around the web: 20 fabulous info graphics about business",
      date: "Sep 15, 2022",
      image:
        "https://cdn.pixabay.com/photo/2025/01/07/16/56/sand-9317325_1280.jpg",
    },
    {
      id: 3,
      title:
        "Ten unconventional tips about startups that you can't learn from books",
      date: "Sep 28, 2022",
      image:
        "https://cdn.pixabay.com/photo/2025/01/07/16/56/sand-9317325_1280.jpg",
    },
  ];

  return (
    <div className="space-y-6 ">
      {recentBlogs.map((recentBlog) => (
        <div key={recentBlog.id} className="flex gap-4 items-center">
          <img
            src={recentBlog.image}
            alt={recentBlog.title}
            className="w-32 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2 line-clamp-2">
              {recentBlog.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {dayjs(recentBlog.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
              <Link
                to={`/blog/${recentBlog._id}`}
                className="text-blue-400 hover:text-blue-300"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RecentBlogs;
