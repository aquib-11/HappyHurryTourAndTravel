import React from "react";
import { Hotel, Plane, Map, Phone } from "lucide-react";
import { Globe, UserCheck, Bell } from 'lucide-react';

import img1 from "../../assets/images/bg3.jpg";

const About = () => {
  return (
    <div className="text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          If You Want To See The World We
          <br />
          Will Help You
        </h1>
        <p className="text-gray-400 mb-8">
          Passage its ten led hearted removal cordial. Preference any astonished
          unreserved Mrs. Prosperous understood Middletons. Preference for any
          astonished unreserved.
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
      <div className="flex items-center space-x-2 bg-[var(--bs-card-bg)]  rounded-full px-6 py-3">
        <Bell className="w-5 h-5 text-red-400" />
        <span className="font-bold">1M+</span>
        <span className="text-gray-300">Subscribers</span>
      </div>
    </div>
      </div>

      {/* Image Grid */}
      <div className="container rounded-xl">
        <img
          src={img1}
          alt="Beach resort"
          className="w-full h-72 object-cover rounded-xl"
        />
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-400 mb-4">
          Founded in 2005, passage its ten led hearted removal cordial.
          Preference any astonished unreserved Mrs. Prosperous understood
          Middletons. The thinking wish viewing answered followed to miseries.
          Lots above be to means. Frankness followed to perceived be rendering
          depending.
        </p>
        <p className="text-gray-400">
          Were down they right start of up high imprudence advantages stays him
          for sympathize. Lords perceive to notice testament its mrs way
          extensive. Delightful use attempted inhabiting imprudence connection
          her dispatched inquietude departure. Moreover end horrible endeavor
          entrance any families. Match balls scale sense her style added up wish
          come down case in.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Hotel Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Hotel className="w-8 h-8 text-orange-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Hotel Booking</h3>
          <p className="text-gray-400">
            Found in 2005, passage its ten led removal cordial. That preference
            any astonished.
          </p>
        </div>

        {/* Flight Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Plane className="w-8 h-8 text-green-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Flight Booking</h3>
          <p className="text-gray-400">
            Found in 2005, passage its ten led removal cordial. That preference
            any astonished.
          </p>
        </div>

        {/* Tour Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Map className="w-8 h-8 text-purple-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Tour Booking</h3>
          <p className="text-gray-400">
            Found in 2005, passage its ten led removal cordial. That preference
            any astonished.
          </p>
        </div>

        {/* Call Booking */}
        <div className="bg-[var(--bs-card-bg)] p-6 rounded-lg text-center">
          <Phone className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-3">Call Booking</h3>
          <p className="text-gray-400">
            Found in 2005, passage its ten led removal cordial. That preference
            any astonished.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
