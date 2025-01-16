import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import JoditEditor from "jodit-react";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

// Validation utilities
const validateBlogData = (data) => {
  const errors = {};
  if (!data.title?.trim()) errors.title = "Title is required";
  if (!data.content?.trim()) errors.content = "Content is required";
  if (data.tags?.length === 0) errors.tags = "At least one tag is required";
  return errors;
};

// Loader function
export const editBlogLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/blog/${params.id}`);
    return {
      blog: data,
      error: null,
    };
  } catch (error) {
    return {
      blog: null,
      error: error?.response?.data?.msg || "Failed to load blog",
    };
  }
};

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, error: loadError } = useLoaderData();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    image: null,
  });

  // UI state
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  // Editor config
  const editorConfig = {
    readonly: false,
    height: 500,
    toolbarButtonSize: "medium",
    buttons: ["bold", "italic", "ul", "ol", "link", "image"],
  };

  // Initialize form data from loaded blog
  useEffect(() => {
    if (blog) {
      try {
        const parsedTags = JSON.parse(blog.tags);

        setFormData({
          title: blog.title || "",
          content: blog.content || "",
          tags: parsedTags || [],
          image: null,
        });
      } catch (err) {
        toast.error("Error loading blog data");
        console.error("Error parsing blog data:", err);
      }
    }
  }, [blog]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle content change from Jodit
  const handleContentChange = (newContent) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Tag management
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
      if (errors.tags) {
        setErrors((prev) => ({
          ...prev,
          tags: null,
        }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateBlogData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("tags", JSON.stringify(formData.tags));
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await customFetch.put(`/blog/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully");
      navigate("/blog-grid");
    } catch (err) {
      const errorMessage = err?.response?.data?.msg || "Failed to update blog";
      toast.error(errorMessage);
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error if blog failed to load
  if (loadError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{loadError}</p>
          <button
            onClick={() => navigate("/all-blogs")}
            className="mt-2 text-sm underline"
          >
            Return to All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--bs-white)] font-sans">
          Edit Blog
        </h2>
        <button
          onClick={() => navigate("/all-blogs")}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`inputText ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <JoditEditor
            value={formData.content}
            config={editorConfig}
            // onChange={handleContentChange}
            onBlur={handleContentChange}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold">Image</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="inputText"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-20 w-20 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block mb-2 font-semibold">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              //   onKeyPress={(e) => {
              //     if (e.key === "Enter") {
              //       e.preventDefault();
              //       handleAddTag();
              //     }
              //   }}
              placeholder="Add a tag"
              className="inputText"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="submitButton"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <MdDelete
                  onClick={() => handleRemoveTag(tag)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </span>
            ))}
          </div>
          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">{errors.tags}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submitButton"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
