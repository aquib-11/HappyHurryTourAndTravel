import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { MdDelete, MdOutlineLocalConvenienceStore } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const addDestinationAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.highlights = formData.getAll("highlights"); // Add highlights to the data
  try {
    const response = await customFetch.post("/destination", data);
    toast.success("Destination added successfully");
    return redirect(
      "/admin/add-destination-images/" + response.data.destinations._id
    );
  } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddDestination = () => {
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  const addHighlight = () => {
    if (highlightInput && !highlights.includes(highlightInput)) {
      setHighlights([...highlights, highlightInput]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (highlight) => {
    setHighlights(highlights.filter((h) => h !== highlight));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MdOutlineLocalConvenienceStore className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Add Destination</h2>
          </div>
        </div>
      </div>
      <Form method="post" className="space-y-4">
        <div>
          <label>Destination Name:</label>
          <input
            type="text"
            name="destinationName"
            required
            className="inputText"
          />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" required className="inputText" />
        </div>
        <div>
          <label>Overview:</label>
          <textarea name="overview" required className="inputText"></textarea>
        </div>
        <div>
          <label>Highlights:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              placeholder="Add a highlight"
              className="inputText"
              required
            />
            <button
              type="button"
              onClick={addHighlight}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex  flex-wrap gap-2 mt-2">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {highlight}
                <div
                  onClick={() => removeHighlight(highlight)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {highlights.map((highlight, index) => (
            <input
              type="hidden"
              name="highlights"
              value={highlight}
              key={index}
            />
          ))}
        </div>
        <button type="submit" className="submitButton">
          Add Destination
        </button>
      </Form>
    </div>
  );
};

export default AddDestination;
