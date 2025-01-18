import React, { useState } from "react";
import JoditEditor from "jodit-react";
import customFetch from "../../../utils/customFetch";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { FaBlog, FaPlus } from "react-icons/fa6";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      formData.append("tags", JSON.stringify(tags)); // Send tags as an array

      await customFetch.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created successfully");
      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setTags([]);
      setTagInput("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create blog. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBlog className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Add Blog</h2>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inputText"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Content:</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="min-h-[300px]"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="inputText"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Tags:</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Add a tag"
              className="inputText"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <MdDelete
                  onClick={() => removeTag(tag)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </span>
            ))}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitButton">
          {isSubmitting ? "Creating Blog..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
