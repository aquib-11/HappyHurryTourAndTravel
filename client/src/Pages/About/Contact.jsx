import React, { useState } from "react";
import { FaGlobe, FaEnvelope, FaHeadphones,  } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaWhatsapp,  } from "react-icons/fa";
import img from "../../assets/images/contact.svg";
import { Form } from "react-router-dom";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
return (
    <div className="container min-h-screen text-white p-8 ">
        <div className=" mx-auto ">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Let's connect and get to know each other
                </h1>
                <p className="text-gray-400">
                    Passage its ten led hearted removal cordial. Preference any
                    astonished unreserved Mrs. Prosperous understood Middletons.
                    Preference for any astonished unreserved.
                </p>
            </div>

            {/* Cards Container */}
            <div className="grid md:grid-cols-3 gap-6 text-center">
                {/* Call Us Card */}
                <div className="bg-[var(--bs-card-bg)] rounded-lg p-6">
                    <div className="mb-4">
                        <FaGlobe className="w-8 h-8 text-cyan-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Call us</h2>
                    <p className="text-gray-400 mb-4">
                        Imprudence attachment him his for sympathize. Large above be
                        to means.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-center text-indigo-400">
                            <a href ="tel:+123456789">+123 456 789</a>
                        </div>
                        <div className="flex items-center justify-center text-white">
                            <a href ="tel:+2224567586">+(222)4567 586</a>
                        </div>
                    </div>
                </div>

                {/* Email Us Card */}
                <div className="bg-[var(--bs-card-bg)] rounded-lg p-6 items-center">
                    <div className="mb-4">
                        <FaEnvelope className="w-8 h-8 text-red-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Email us</h2>
                    <p className="text-gray-400 mb-4">
                        Large above be to means. Him his for sympathize.
                    </p>
                    <a
                        href="mailto:example@gmail.com"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        example@gmail.com
                    </a>
                </div>

                {/* Social Media Card */}
                <div className="bg-[var(--bs-card-bg)] rounded-lg p-6">
                    <div className="mb-4">
                        <FaHeadphones className="w-8 h-8 text-amber-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Social media</h2>
                    <p className="text-gray-400 mb-4">
                        Sympathize Large above be to means.
                    </p>
                    <div className="flex justify-center space-x-3">
                        <a
                            href="https://www.facebook.com/people/Happy-hurry-tourtravels/61554337767234/"
                            target="_blank"
                            className="bg-blue-600 p-2 rounded-md hover:bg-blue-700"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/happy_hurry_tour_travels/p/DDFK6PshRl3/"
                            target="_blank"
                            className="bg-pink-600 p-2 rounded-md hover:bg-pink-700"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://api.whatsapp.com/+91999999999"
                            target="_blank"
                            className="bg-green-600 p-2 rounded-md hover:bg-green-700"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                        </a>
                      
                    </div>
                </div>
            </div>
        </div>
        <div className="flex gap-5 flex-col md:flex-row items-center justify-center rounded-lg relative mt-12">
            <img src={img} alt="" className="w-[600px]" />
            <div className="p-8 rounded-lg bg-[var(--bs-card-bg)]">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                    Send us message
                </h2>

                <Form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">
                                Your name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">
                                Email address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">
                            Mobile number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            className="w-4 h-4 mr-2"
                            required
                        />
                        <label className="text-gray-300">
                            By submitting this form you agree to our terms and conditions.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-900 transition-colors"
                    >
                        Send Message
                    </button>
                </Form>
            </div>
        </div>
    </div>
);
};

export default Contact;
