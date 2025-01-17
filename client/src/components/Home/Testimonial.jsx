import React, { useEffect, useState } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import DeleteModal from "../shared/DeleteModal";
dayjs.extend(advancedFormat);

const Testimonial = () => {
  const [alltestimonials, setAllTestimonials] = useState([]);
  const { user: admin } = useHomeLayoutContext();
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  const [isDeleting, setIsDeleting] = useState(false);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  const [formdata, setFormData] = useState({
    name: user?.name,
    rating: "",
    email: user?.email,
    message: "",
  });

  const splideOptions = {
    type: "slide",
    perPage: 3,
    perMove: 1,
    gap: "2rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      1024: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      },
    },
  };

  // Create
  const submitForm = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      return;
    }
    try {
      await customFetch.post("/testimonial", formdata);
      toast.success(" Thanks for your review");
      fetchTestimonials();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setFormData({
        message: "",
        rating: "",
        email: "",
        name: "",
      });
      setIsModelOpen(false);
    }
  };

  // Read
  const fetchTestimonials = async () => {
    try {
      const { data } = await customFetch.get("/testimonial");

      setAllTestimonials(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const deleteTestimonial = async (id) => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/testimonial/${id}`);
      toast.success("Testimonial deleted successfully");
      setIsDeleting(false);
      fetchTestimonials();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setIsDeleting(false);
    }
  };

  const confirmDelete = async () => {
    if (testimonialToDelete) {
      await deleteTestimonial(testimonialToDelete);
      setTestimonialToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="relative container ">
      <div>
        <div className="flex justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-[var(--bs-text)] uppercase font-sans text-sm tracking-wider mb-2">
              TESTIMONIAL
            </p>
            <h1 className=" font-bold font-sans text-white">
              What our client say
            </h1>
            <p className="text-gray-400 mt-2 font-sans">
              Hear what our clients say about their experiences and the value we
              deliver.{" "}
            </p>
          </div>
        </div>

        <Splide options={splideOptions}>
          {alltestimonials.map((testimonial, index) => (
            <SplideSlide key={index} className="flex justify-center">
              <div className="bg-[var(--bs-card-bg)] rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--bs-text)] text-white font-bold text-3xl flex items-center justify-center">
                    {testimonial.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>
                  <div className="ml-4 flex justify-between w-full">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <p>
                        {dayjs(testimonial.createdAt).format("MMM DD, YYYY")}
                      </p>
                    </div>

                    {admin?.userRole === "admin" ||
                      (user?.email === testimonial?.email && (
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setTestimonialToDelete(testimonial._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                            disabled={isDeleting}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-300">{testimonial.message}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => setIsModelOpen(true)}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Review Us
        </button>

        {isModelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in border border-gray-800">
              <span
                onClick={() => setIsModelOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer text-xl"
              >
                &times;
              </span>

              <h2 className="text-2xl font-bold mb-4 p-6 text-white border-b border-gray-800">
                Leave a Review
              </h2>

              <form onSubmit={(e) => submitForm(e)} className="p-6 space-y-6">
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Rating
                  </label>
                  <input
                    type="range"
                    id="rating"
                    value={formdata.rating}
                    onChange={(e) =>
                      setFormData({ ...formdata, rating: e.target.value })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    min="1"
                    max="5"
                  />
                  <div className="flex justify-between px-1 mt-1">
                    <span className="text-sm text-gray-400">Poor</span>
                    <span className="text-sm text-gray-400">Excellent</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={formdata.message}
                    onChange={(e) =>
                      setFormData({ ...formdata, message: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                    text-gray-200 placeholder-gray-500
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Share your thoughts..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium 
                  py-2 px-4 rounded-lg transition-colors duration-200
                  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName="this testimonial"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Testimonial;
