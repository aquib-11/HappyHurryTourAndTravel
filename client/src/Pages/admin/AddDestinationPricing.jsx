import React, { useState, useEffect } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDestinationPricing = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [cabsPricing, setCabsPricing] = useState([]);
  const [cabTypes, setCabTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCabTypes = async () => {
      const response = await customFetch.get("/cab");
      console.log({ response });
      setCabTypes(response.data.cabs);
      // Create a new object for each cab type with ID and price
      setCabsPricing(
        response.data.cabs.map((cab) => ({ cabType: cab._id, price: "" }))
      ); // Initialize pricing for each cab type
    };
    fetchCabTypes();
  }, []);

  const handlePricingChange = (index, event) => {
    const values = [...cabsPricing];
    values[index].price = event.target.value;
    setCabsPricing(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await customFetch.post("/cabPricing", {
        route,
        pricing: cabsPricing.map((pricing) => ({
          cabType: pricing.cabType,
          price: pricing.price,
        })),
      });

      setRoute("");
      setCabsPricing(Array(cabTypes.length).fill({ cabType: "", price: "" }));
      toast.success("Destination pricing added successfully!");
      setIsSubmitting(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding destination pricing:", error);
      toast.error("Failed to add destination pricing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-center">Add Cab Pricing</h3>
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
          {isSubmitting ? "Submiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddDestinationPricing;
