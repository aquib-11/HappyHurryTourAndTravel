import React, { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
const OneWay = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [data, setData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    pickupDate: "",
    selectCab: "",
    customerName: user?.name,
    customerEmail: user?.email,
  });
  const [cabs, setCabs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fetchcabs = async () => {
    setSubmitting(true);
    try {
      const { data } = await customFetch.get("/cab");
      setCabs(data.cabs);
    } catch (error) {
      console.log(error);
    }
  };
  const bookOneWay = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      return;
    }
    try {
      await customFetch.post("/bookOneWay", data);
      toast.success("Cab Booked Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchcabs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto  bg-[var(--bs-card-bg)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookOneWay();
        }}
      >
        {/* Location Inputs Row */}
        <div className="grid grid-cols-2 gap-4 items-center justify-center mb-4">
          {/* Pickup Location */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] mb-2">Pickup</label>
            <input
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
            <label className="text-sm text-[var(--bs-400)]mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              placeholder="Select Date"
              className="cabInputs"
              required
              onChange={(e) => setData({ ...data, pickupDate: e.target.value })}
            />
          </div>

          {/* Pickup Time */}
          <div className="flex flex-col">
            <label className="text-sm text-[var(--bs-400)] ">Pickup time</label>
            <input
              type="time"
              placeholder="Select Date"
              className="cabInputs"
              required
              onChange={(e) => setData({ ...data, pickupTime: e.target.value })}
            />
          </div>
          <select
            className="cabInputs"
            defaultValue={"select car"}
            required
            onChange={(e) => setData({ ...data, selectCab: e.target.value })}
          >
            <option value="select car" disabled>
              Select Car
            </option>
            {cabs.map((cab) => {
              return (
                <option value={cab._id} key={cab._id}>
                  {cab.name}
                </option>
              );
            })}
          </select>
          {/* Search Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--bs-black)] text-[var(--bs-white)] font-semibold py-3 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors"
          >
            {submitting ? "Book Now" : "Booking..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OneWay;
