import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
import DeleteModal from "../shared/DeleteModal";
import { Edit2, Trash2 } from "lucide-react";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";

dayjs.extend(advancedFormat);

// Single Blog Card Component
const AllLatestblogsCard = ({ blog }) => {
  const { user } = useHomeLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const _id = blog._id;
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/blog/${_id}`);
      toast.success("Blog deleted successfully");
      setIsModalOpen(false);
      setIsDeleting(false);
      navigate("/blog-grid");
    } catch (error) {
      setIsDeleting(false);
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setIsModalOpen(false);
    }
  };
  const date = dayjs(blog.createdAt).format("MMM DD, YYYY");
  return (
    <div className="relative p-3 bg-[var(--bs-card-bg)] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between h-[100%]">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 rounded-full text-sm text-white
            ${blog.category === "History" ? "bg-yellow-500" : ""}
            ${blog.category === "Research" ? "bg-purple-500" : ""}
            ${blog.category === "Business" ? "bg-red-500" : ""}
            ${blog.category === "Technology" ? "bg-blue-500" : ""}
            ${blog.category === "Adventure" ? "bg-gray-800" : ""}
            ${blog.category === "Hotel Service" ? "bg-green-500" : ""}`}
        >
          {blog.category}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold font-sans text-white mb-2 transition-colors line-clamp-2">
          {blog?.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm"> {date}</div>
          <Link
            to={`/blog/${blog?._id}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Read more →
          </Link>
        </div>
        {user?.userRole === "admin" && (
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to={`/admin/edit-blog/${blog?._id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-all duration-300 ease-in-out"
              >
              <Edit2 size={16} />
              <span>Edit</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all duration-300 ease-in-out"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={blog?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AllLatestblogsCard;
