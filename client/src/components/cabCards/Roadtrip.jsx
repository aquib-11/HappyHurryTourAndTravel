import React, { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
const Roadtrip = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const  [data, setData]  = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    pickupDate: "",
    returnDate: "",
    returnTime: "",
    selectCab: "",
    customerName: user?.name,
    customerEmail: user?.email,
  });
  const [cabs, setCabs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
const fetchcabs = async () => {
  setSubmitting(true);
  try {
    const {data} = await customFetch.get("/cab");
    setCabs(data.cabs);
  } catch (error) {
    console.log(error);
  }
  finally {setSubmitting(false)};
};
  const booktwoWay = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      return
    } 
    try {
       await customFetch.post("/bookTwoWay", data);
      toast.success("Cab Booked Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    fetchcabs();
  }, []);
  return (

    <div className="max-w-3xl mx-auto  bg-[var(--bs-card-bg)] ">
      {/* Location Selection */}
        <form onSubmit={(e) => booktwoWay(e)}>
      <div className="grid grid-cols-2 gap-4 items-center mb-6">
        {/* Pickup Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Pickup</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select Location"
              className="cabInputs"
              onChange={(e) => setData({...data, pickupLocation: e.target.value})}
              required/>
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">Drop</label>
          <input
            type="text"
            placeholder="Select Location"
            className="cabInputs"  
            onChange={(e) => setData({...data, dropLocation: e.target.value})}
            required
                    />
        </div>
      </div>

      {/* Pickup Date/Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Pickup Date
          </label>
          <input
            type="date"
            placeholder="Select Date"
            className="cabInputs"
            onChange={(e) => setData({...data, pickupDate: e.target.value})}
            required
                     />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Pickup time
          </label>
          <input
            type="time"
            placeholder="Select Time"
            className="cabInputs"
            onChange={(e) => setData({...data, pickupTime: e.target.value})}
            required
                     />
        </div>
      </div>

      {/* Return Date/Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Return Date
          </label>
          <input
            type="date"
            placeholder="Select Date"
            className="cabInputs"
            onChange={(e) => setData({...data, returnDate: e.target.value})}
            required
                     />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Return time
          </label>
          <input
            type="time"
            placeholder="Select Time"
            className="cabInputs"
            onChange={(e) => setData({...data, returnTime: e.target.value})}
            required
                     />
        </div>
      <div className="flex flex-col">
      <label className="text-sm text-[var(--bs-400)] mb-2">
            Select car
          </label>
      <select className="cabSelect" defaultValue={"select car"} required
        onChange={(e) => setData({...data, selectCab: e.target.value})}
        >
          <option value="select car" disabled>
            Select Car
          </option>
          {
            cabs.map((cab) => {
              return (
                <option value={cab._id} key={cab._id}>
                  {cab.name}
                </option>
              );
            })
          }
        </select>
      </div>
        <div className="flex flex-col">
          <label className="text-sm text-[var(--bs-400)] mb-2">
            Mobile
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            className="cabInputs"
            onChange={(e) => setData({...data, phoneNumber: e.target.value})}
            required
                     />
        </div>
        {/* Search Button */}
        <button type="submit" disabled={submitting} className="col-span-2 w-full bg-[var(--bs-black)] text-[var(--bs-white)] hover:bg-gray-800/30 font-semibold py-3 rounded-lg  transition-colors">
          {submitting ? "Booking..." : "Book Now"}
        </button>
      </div>
      </form>
    </div>
  );
};

export default Roadtrip;
