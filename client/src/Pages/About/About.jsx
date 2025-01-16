import React from "react";
import { Hotel, Car, Map, Phone } from "lucide-react";
import { Globe, UserCheck, Bell } from "lucide-react";

import img1 from "../../assets/images/bg3.jpg";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

const About = () => {
  const { user } = useHomeLayoutContext();
  return (
    <div className="container text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="font-sans font-bold mb-4">
          If You Want To See The World, We
          <br />
          Will Help You Explore It
        </h1>
        <p className="text-gray-400 mb-8">
          From the picturesque valleys of Kashmir to exciting travel destinations, 
          we bring you unparalleled experiences, affordable travel options, and top-notch services.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {/* Global Customers Stat */}
          <div className="flex items-center space-x-2 bg-[var(--bs-card-bg)] rounded-full px-6 py-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="font-bold">14K+</span>
            <span className="text-gray-300">Global Customers</span>
          </div>

          {/* Happy Customers Stat */}
          <div className="flex items-center space-x-2 bg-[var(--bs-card-bg)] rounded-full px-6 py-3">
            <UserCheck className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">10K+</span>
            <span className="text-gray-300">Happy Customers</span>
          </div>

          {/* Subscribers Stat */}
          <div className="flex items-center space-x-2 bg-[var(--bs-card-bg)] rounded-full px-6 py-3">
            <Bell className="w-5 h-5 text-red-400" />
            <span className="font-bold">1M+</span>
            <span className="text-gray-300">Visiters</span>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="rounded-xl">
        <img
          src={img1}
          alt="Beach resort"
          className="w-full h-72 object-cover rounded-xl"
        />
      </div>

      {/* Our Story Section */}
      <div className="mx-auto mb-12">
        <h2 className="font-sans font-bold my-6">Our Story</h2> 
        <p className="text-gray-400">
          {user.adminDetails?.aboutUsStory}
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Hotel Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Hotel className="w-8 h-8 text-orange-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Hotel Booking</h3>
          <p className="text-gray-400">
            Book top-rated hotels with ease and enjoy luxury accommodations that fit your budget.
          </p>
        </div>

        {/* Cab Service */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Car className="w-8 h-8 text-green-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Cab Service</h3>
          <p className="text-gray-400">
            Seamless cab services for city tours, airport pickups, and road trips at competitive prices.
          </p>
        </div>

        {/* Tour Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Map className="w-8 h-8 text-purple-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Tour Booking</h3>
          <p className="text-gray-400">
            Explore curated tour packages to breathtaking destinations across Kashmir and beyond.
          </p>
        </div>

        {/* Call Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Phone className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Call Booking</h3>
          <p className="text-gray-400">
            Need assistance? Our 24/7 call booking service ensures help is just a phone call away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
