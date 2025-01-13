import React, { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const addCabAction = async ({ request }) => {
  const formData = new FormData();
  const data = await request.formData();

  // Append each field to FormData
  for (const [key, value] of data.entries()) {
    formData.append(key, value);
  }

  try {
    const response = await customFetch.post("/cab", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ response });
    toast.success("Cab added successfully");
    // return redirect("/admin/cab-home");
    return null;
  } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const cabFeatures = [
  "AC",
  "Non-AC",
  "Pushback Seats",
  "4-seater",
  "7-seater",
  "12-seater",
  "Petrol",
  "Diesel",
  "Hybrid",
  "Music System",
  "Charger",
];

const AddCab = () => {
  const [features, setFeatures] = useState([]);

  const [selectedFeature, setSelectedFeature] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const addFeature = () => {
    if (selectedFeature && !features.includes(selectedFeature)) {
      setFeatures([...features, selectedFeature]);
      setSelectedFeature("");
    }
    if (customFeature && !features.includes(customFeature)) {
      setFeatures([...features, customFeature]);
      setCustomFeature("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2 className="text-center">Add Cab</h2>
      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label>Cab Name:</label>
          <input
            type="text"
            name="name"
            required
            className="inputText"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Seating Capacity:</label>
          <input
            type="number"
            name="seatingCapacity"
            required
            className="inputText"
            min="1"
            onChange={(e) => setSeatingCapacity(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            required
            className="inputText"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>Features:</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <select
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              className="inputText"
            >
              <option value="">Select a feature</option>
              {cabFeatures.map((feature, index) => (
                <option key={index} value={feature}>
                  {feature}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              placeholder="Add your own feature"
              className="inputText"
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {feature}
                <div
                  onClick={() => removeFeature(feature)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {features.map((feature, index) => (
            <input type="hidden" name="features" value={feature} key={index} />
          ))}
        </div>
        <div>
          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            required
            className="inputText"
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div>
          <label>Driver Phone:</label>
          <input
            type="text"
            name="driverPhone"
            required
            className="inputText"
            onChange={(e) => setDriverPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Cab"}
        </button>
      </Form>
    </div>
  );
};

export default AddCab;
