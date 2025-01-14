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
    <div className="relative  bg-[var(--bs-card-bg)] p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between h-[100%]">
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
        <h3 className="text-xl font-bold text-white mb-2 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm"> {date}</div>
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Read more →
          </Link>
        </div>
        {user?.userRole === "admin" && (
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to={`/admin/edit-blog/${blog._id}`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
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
        itemName={blog.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AllLatestblogsCard;
