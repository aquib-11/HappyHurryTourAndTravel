import React, { useState } from "react";
import OneWay from "../cabCards/OneWay";
import Roadtrip from "../cabCards/Roadtrip";
import img1 from "../../assets/images/bg6.jpg";
const BookCab = () => {
  const [tripType, setTripType] = useState("oneway");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Booking a ${tripType} trip`);
  };

  return (
    <div className="container my-10   ">
      <h1 className="font-sans font-bold leading-tight text-center text-[var(--bs-white)] my-4 hidden md:block">
        Book your Online Cab
      </h1>
      <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
        <div className="bg-[var(--bs-card-bg)] rounded-lg shadow-lg text-center flex-1 p-6 md:order-1 order-2">
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                value="oneway"
                checked={tripType === "oneway"}
                onChange={() => setTripType("oneway")}
                className="form-radio h-4 w-4 text-[var(--bs-gray-400)] appearance-none border-2 border-gray-300 rounded-full checked:bg-[var(--bs-text)] checked:border-transparent focus:outline-none transition-all duration-300"
              />
              <span className="text-[var(--bs-white)] text-sm">One Way</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                value="roadtrip"
                checked={tripType === "roadtrip"}
                onChange={() => setTripType("roadtrip")}
                className="form-radio h-4 w-4 text-[var(--bs-gray-400)] appearance-none border-2 border-gray-300 rounded-full checked:bg-[var(--bs-text)] checked:border-transparent focus:outline-none transition-all duration-300"
              />
              <span className="text-[var(--bs-white)] text-sm">Road Trip</span>
            </label>
          </div>
          <div className="mt-4">
            {tripType === "oneway" ? <OneWay /> : <Roadtrip />}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center flex-1 md:order-2 order-1">
          <h1 className="text-[var(--bs-white)] font-sans font-bold leading-tight">
            Book Your Ride, Your Way
            <br />
            Comfortable and Reliable Cabs
            <div className="h-1 w-24 bg-[var(--bs-text)] mt-2"></div>
          </h1>
          <p className="text-gray-400 text-lg font-sans">
            Whether it's a one-way trip or an exciting road trip, we’ve got you
            covered. Choose your ride, book online, and enjoy a seamless travel
            experience with Happy Hurry Cab Services. Your journey begins here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCab;
