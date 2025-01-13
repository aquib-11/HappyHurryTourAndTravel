import React, { useState } from "react";
import { CarCard, DestinaitonPrices, OneWay } from "../../components";
import Roadtrip from "../../components/cabCards/Roadtrip";
import img1 from "../../assets/images/bg6.jpg";
import { Zap, Leaf, Shield, Car, Wifi, Accessibility } from "lucide-react";
import customFetch from "../../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const cabHomeLoader = async () => {
  try {
    const { data } = await customFetch.get("/cab");
    return data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const CabHome = () => {
  const { cabs } = useLoaderData();

  const [tripType, setTripType] = useState("oneway");
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: "Advance Booking",
      description:
        "Plan your trip ahead with our hassle-free advance booking options for a stress-free journey.",
      bgColor: "bg-purple-950/40",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Economical Trip",
      description:
        "Enjoy affordable rides with transparent pricing and no hidden charges.",
      bgColor: "bg-green-950/40",
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      title: "Secure and Safer",
      description:
        "Your safety is our top priority with well-maintained vehicles and verified drivers.",
      bgColor: "bg-yellow-950/40",
    },
    {
      icon: <Car className="w-6 h-6 text-red-500" />,
      title: "Vehicle Options",
      description: "Choose from a variety of vehicles to suit your needs.",
      bgColor: "bg-red-950/40",
    },
    // {
    //   icon: <Wifi className="w-6 h-6 text-amber-500" />,
    //   title: "Cha",
    //   description:
    //     "Stay connected on the go with complimentary Wi-Fi and entertainment options.",
    //   bgColor: "bg-amber-950/40",
    // },
    {
      icon: <Accessibility className="w-6 h-6 text-teal-500" />,
      title: "Polite Driver",
      description:
        "Experience courteous and professional service with our trained and friendly drivers.",
      bgColor: "bg-teal-950/40",
    },
  ];

  return (
    <div className="container">
      {/* Booking Form container */}
      <div className="relative  mx-auto min-h-screen md:min-h-screen flex items-center justify-center px-4">
        <img
          src={img1}
          alt=""
          className=" absolute inset-0 w-full lg:w-[1000px] lg:h-[650px] object-cover ml-auto rounded-xl"
        />
        {/* booking form */}
        <div className="absolute top-2/3 left-1/2  lg:top-1/2 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-[var(--bs-card-bg)] rounded-lg shadow-lg text-center z-10 ">
          <h1 className="text-2xl text-start font-bold text-[var(--bs-white)] mb-6">
            Book your Online Cab
          </h1>
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
      </div>

      {/* Our vehicles */}
      <div>
        <h1 className="text-center text-[var(--bs-white)] font-sans font-semibold my-8">
          Our Awesome Vehicles
        </h1>
      </div>
      <div className=" flex items-center justify-center flex-wrap gap-4 py-4 ">
        {cabs.map((cab, index) => (
          <CarCard key={index} cab={cab} />
        ))}{" "}
      </div>

      {/* Destinaiton Pricing */}
      <div className=" w-full md:py-16">
        <h1 className="text-[--bs-white] text-center  font-sans font-bold my-8">
          Cab Pricing
        </h1>
        <DestinaitonPrices
          cabs={cabs.map((cab) => {
            return { name: cab.name, _id: cab._id };
          })}
        />
      </div>

      {/* why choose us */}
      <div className=" w-full md:py-16">
        <h1 className=" font-bold font-sans text-white text-center my-8">
          Why Choose Us
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[var(--bs-card-bg)] "
            >
              <div
                className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabHome;
