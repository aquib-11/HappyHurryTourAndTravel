// Single Blog Card Component
const AllLatestblogsCard = ({ post }) => {
  return (
    <div className="relative group">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 rounded-full text-sm text-white
            ${post.category === "History" ? "bg-yellow-500" : ""}
            ${post.category === "Research" ? "bg-purple-500" : ""}
            ${post.category === "Business" ? "bg-red-500" : ""}
            ${post.category === "Technology" ? "bg-blue-500" : ""}
            ${post.category === "Adventure" ? "bg-gray-800" : ""}
            ${post.category === "Hotel Service" ? "bg-green-500" : ""}`}
        >
          {post.category}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-gray-400 mb-3 text-sm line-clamp-2">
            {post.description}
          </p>
        )}
        <div className="text-gray-400 text-sm">By {post.createAt}</div>
      </div>
    </div>
  );
};

export default AllLatestblogsCard;
