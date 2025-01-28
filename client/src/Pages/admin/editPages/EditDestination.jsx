import React, { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export const editDestinationAction = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.highlights = formData.getAll("highlights");
  try {
    const response = await customFetch.patch(`/destination/${params.id}`, data);
    console.log({ response });
    toast.success("Destination updated successfully");
    return redirect("/all-destinations");
  } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
export const editDestinationLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/destination/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const EditDestination = () => {
  const isSubmitting = useNavigation().state === "submitting";

  const { destinations } = useLoaderData();
  const [highlights, setHighlights] = useState(destinations.highlights);
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
      <h2 className="text-center text-[var(--bs-white)] font-sans">
        Edit Destination
      </h2>
      <Form method="post" className="space-y-4">
        <div>
          <label>Destination Name:</label>
          <input
            defaultValue={destinations.destinationName}
            type="text"
            name="destinationName"
            required
            className="inputText"
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            required
            className="inputText"
            defaultValue={destinations.title}
          />
        </div>
        <div>
          <label>Overview:</label>
          <textarea
            name="overview"
            required
            className="inputText"
            defaultValue={destinations.overview}
          />
        </div>
        <div>
          <label>Highlights:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue={highlightInput}
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
        <button type="submit" className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Updating Destination..." : "Update Destination"}
        </button>
      </Form>
    </div>
  );
};

export default EditDestination;
