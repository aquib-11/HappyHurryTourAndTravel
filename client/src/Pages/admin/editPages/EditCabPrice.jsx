import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/customFetch";

export const editCabPriceLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/cabPricing/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditCabPrice = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [route, setRoute] = useState(data?.pricing?.route);
  const [cabsPricing, setCabsPricing] = useState([]);
  const [cabTypes, setCabTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCabTypes = async () => {
      try {
        const response = await customFetch.get("/cab");
        setCabTypes(response.data.cabs);

        // Map existing prices with cab types
        const initialPricing = response.data.cabs.map((cab) => {
          // Find matching price from loader data
          const existingPrice = data.pricing.pricing.find(
            (p) => p.cabType === cab._id
          );

          return {
            cabType: cab._id,
            price: existingPrice ? existingPrice.price : "",
          };
        });

        setCabsPricing(initialPricing);
      } catch (error) {
        console.error("Error fetching cab types:", error);
        toast.error("Failed to fetch cab types");
      }
    };

    fetchCabTypes();
  }, [data.pricing.pricing]);

  const handlePricingChange = (index, event) => {
    const values = [...cabsPricing];
    values[index].price = event.target.value;
    setCabsPricing(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await customFetch.patch(`/cabPricing/${data.pricing._id}`, {
        route,
        pricing: cabsPricing.map((pricing) => ({
          cabType: pricing.cabType,
          price: pricing.price,
        })),
      });

      toast.success("Destination pricing updated successfully!");
      navigate("/"); // Navigate to the main page after successful update
    } catch (error) {
      console.error("Error updating destination pricing:", error);
      toast.error("Failed to update destination pricing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-[var(--bs-white)] font-sans">
        Edit Cab Pricing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Route:</label>
          <input
            type="text"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
            className="inputText"
          />
        </div>
        {cabTypes.map((cab, index) => (
          <div key={cab._id}>
            <label>{cab.name} Price:</label>
            <input
              type="number"
              value={cabsPricing[index]?.price}
              onChange={(event) => handlePricingChange(index, event)}
              required
              className="inputText"
            />
          </div>
        ))}
        <button type="submit" className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditCabPrice;
