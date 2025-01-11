import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const addDestinationAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.highlights = formData.getAll("highlights"); // Add highlights to the data
  try {
    const response = await customFetch.post("/destination", data);
    console.log({ response });
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
      <h2 className="text-center">Add Destination</h2>
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
            />
            <button
              type="button"
              onClick={addHighlight}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
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
