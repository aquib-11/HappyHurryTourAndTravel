import React, { useState } from "react";
import { FaGlobe, FaEnvelope, FaHeadphones,  } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaWhatsapp,  } from "react-icons/fa";
import img from "../../assets/images/contact.svg";
import { Form } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
const Contact = () => {
    const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const [submitting, setSubmitting] = useState(false);
    const { user: admin } = useHomeLayoutContext();

  const [formData, setFormData] = useState({
    name: user?.name,
    email:user?.email,
    phone: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      return
    } 
    try {
        formData.name = user?.name;
        formData.email = user?.email;
       await customFetch.post("/contact", formData);
      toast.success("Message Sent");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }finally {
      setSubmitting(false);
      setFormData({
        name: user?.name,
        email: user?.email,
        phone: "",
        message: "",
      });
    }
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
                        <a href ={`tel:${admin?.adminDetails?.phone2}`}>{admin?.adminDetails?.phone2}</a>
                        </div>
                        <div className="flex items-center justify-center text-white">
                            <a href ={`tel:${admin?.adminDetails?.phone}`}>{admin?.adminDetails?.phone}</a>
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
                        href={`mailto:${admin?.adminDetails?.email}`}
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        {admin?.adminDetails?.email}
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
                            href={`${admin?.adminDetails?.facebook}`}
                            target="_blank"
                            className="bg-blue-600 p-2 rounded-md hover:bg-blue-700"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href={`${admin?.adminDetails?.instagram}`}
                            target="_blank"
                            className="bg-pink-600 p-2 rounded-md hover:bg-pink-700"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://wa.me/${admin?.adminDetails?.whatsapp}`}
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

                <form calassName="w-full" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">
                                Your name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">
                                Email address <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                type="email"
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
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows="4"
                            className="w-full bg-[var(--bs-card-bg)] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-900 transition-colors"
                    >
                       {submitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
};

export default Contact;
