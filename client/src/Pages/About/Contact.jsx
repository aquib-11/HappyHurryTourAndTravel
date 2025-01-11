import React, { useState } from "react";
import { Globe, Mail, Headphones } from "lucide-react";
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
                        <Headphones className="w-8 h-8 text-cyan-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Call us</h2>
                    <p className="text-gray-400 mb-4">
                        Imprudence attachment him his for sympathize. Large above be to
                        means.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-center text-indigo-400">
                            <span>+123 456 789</span>
                        </div>
                        <div className="flex items-center justify-center text-white">
                            <span>+(222)4567 586</span>
                        </div>
                    </div>
                </div>

                {/* Email Us Card */}
                <div className="bg-[var(--bs-card-bg)] rounded-lg p-6 items-center">
                    <div className="mb-4">
                        <Mail className="w-8 h-8 text-red-500 mx-auto" />
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
                        <Globe className="w-8 h-8 text-amber-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Social media</h2>
                    <p className="text-gray-400 mb-4">
                        Sympathize Large above be to means.
                    </p>
                    <div className="flex justify-center space-x-3">
                        <a
                            href="#"
                            className="bg-blue-600 p-2 rounded-md hover:bg-blue-700"
                        >
                            <span className="sr-only">Facebook</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="bg-pink-600 p-2 rounded-md hover:bg-pink-700"
                        >
                            <span className="sr-only">Instagram</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="bg-blue-400 p-2 rounded-md hover:bg-blue-500"
                        >
                            <span className="sr-only">Twitter</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="bg-blue-600 p-2 rounded-md hover:bg-blue-700"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
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
