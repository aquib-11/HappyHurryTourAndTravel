import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";

export const addHotelAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.amenities = formData.getAll("amenities");
  try {
    const response = await customFetch.post("/hotel", data);
    console.log({ response });
    toast.success("Hotel added successfully");
    return redirect("/admin/add-hotel-images/" + response.data.hotels._id);
  } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddHotel = () => {
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");

  const addAmenity = () => {
    if (amenityInput && !amenities.includes(amenityInput)) {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenity) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  return (
    <div>
      <h2 className="text-center text-[var(--bs-white)] font-sans">
        Add Hotel
      </h2>
      <Form method="post" className="space-y-4">
        <div>
          <label>Hotel Name:</label>
          <input type="text" name="name" required className="inputText" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" required className="inputText" />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            className="inputText"
          />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" required className="inputText" />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            required
            className="inputText"
          ></textarea>
        </div>
        <div>
          <label>Aminites:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add an amenity"
              className="inputText"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {amenity}
                <div
                  onClick={() => removeAmenity(amenity)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {amenities.map((amenity, index) => (
            <input type="hidden" name="amenities" value={amenity} key={index} />
          ))}
        </div>
        <button type="submit" className="submitButton">
          Add Destination
        </button>
      </Form>
    </div>
  );
};

export default AddHotel;
