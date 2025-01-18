import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

const OneWay = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [data, setData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    pickupDate: "",
    selectCab: "",  // This will store the full cab object
    customerName: user?.name,
    customerEmail: user?.email,
  });
  const [cabs, setCabs] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchcabs = async () => {
    try {
      const { data } = await customFetch.get("/cab");
      setCabs(data.cabs);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cabs");
    }
  };

  const bookOneWay = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      loginWithRedirect();
      return;
    }

    if (!data.selectCab || !data.pickupLocation || !data.dropLocation || !data.pickupDate || !data.pickupTime) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      await customFetch.post("/bookOneWay", data);
      toast.success("Cab Booked Successfully");
      // Clear form
      setData({
        pickupLocation: "",
        dropLocation: "",
        pickupTime: "",
        pickupDate: "",
        selectCab: "",
        customerName: user?.name,
        customerEmail: user?.email,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchcabs();
  }, []);

  useEffect(() => {
    if (user) {
      setData(prev => ({
        ...prev,
        customerName: user.name,
        customerEmail: user.email
      }));
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto bg-[var(--bs-card-bg)]">
      <form onSubmit={bookOneWay}>
        {/* Location Inputs Row */}
        <div className="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          {/* Pickup Location */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">Pickup</label>
            <input
              value={data.pickupLocation}
              onChange={(e) =>
                setData({ ...data, pickupLocation: e.target.value })
              }
              type="text"
              placeholder="Select location"
              className="cabInputs"
              required
            />
          </div>
          {/* Drop Location */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">Drop</label>
            <input
              value={data.dropLocation}
              onChange={(e) =>
                setData({ ...data, dropLocation: e.target.value })
              }
              type="text"
              placeholder="Select Location"
              className="cabInputs"
              required
            />
          </div>
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Pickup Date */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">
              Pickup Date
            </label>
            <input
              value={data.pickupDate}
              type="date"
              className="cabInputs"
              required
              onChange={(e) => setData({ ...data, pickupDate: e.target.value })}
            />
          </div>

          {/* Pickup Time */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">Pickup time</label>
            <input
              value={data.pickupTime}
              type="time"
              className="cabInputs"
              required
              onChange={(e) => setData({ ...data, pickupTime: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="flex flex-col">
         <label className="text-sm text-[var(--bs-400)] mb-2">Select Car</label>
         <select
            className="cabInputs "
            value={data.selectCab}
            required
            onChange={(e) => {
              const selectedCab = cabs.find(cab => cab._id === e.target.value);
              setData({ ...data, selectCab: selectedCab._id }); // Store full cab object
            }}
          >
            <option value="">Select Car</option>
            {cabs.map((cab) => (
              <option value={cab._id} key={cab._id}>
                {cab.name}
              </option>
            ))}
          </select>

         </div>
         <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">Mobile</label>
            <input
              value={data.mobile}
              type="tel"
              className="cabInputs"
              required
              placeholder="Phone Number"
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            />
          </div>
          {/* Submit Button */}
          <button 
            type="submit"
            disabled={submitting}
            className="cursor-pointer w-full bg-[var(--bs-black)] text-[var(--bs-white)] font-semibold py-3 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Booking..." : "Book Now"}
          </button>
        </div>  
      </form>
    </div>
  );
};

export default OneWay;