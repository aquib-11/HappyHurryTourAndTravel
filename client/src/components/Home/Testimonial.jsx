import React, { useEffect, useState } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Trash2 } from "lucide-react";
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

  useEffect(() => {
    setFormData({
      name: user?.name,
      rating: "",
      email: user?.email,
      message: "",
    });
  }, [user]);

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
      toast.error("Please login to submit a review");
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
      {alltestimonials.length !== 0 && (
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
                Hear what our clients say about their experiences and the value
                we deliver.{" "}
              </p>
            </div>
          </div>

          <Splide options={splideOptions}>
            {alltestimonials.map((testimonial, index) => (
              <SplideSlide key={index} className="flex justify-center">
                <div className="bg-[var(--bs-card-bg)] rounded-lg p-6 w-full h-full">
                  <div className="flex items-center mb-4">
                   
                    <div className="ml-4 flex justify-between w-full">
                      <div>
                        <h2 className="text-white font-sans font-semibold text-lg">
                          {testimonial?.name}
                        </h2>
                        <p>
                          {dayjs(testimonial?.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </div>

                      {user?.email === testimonial?.email && (
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setTestimonialToDelete(testimonial?._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                            disabled={isDeleting}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < testimonial?.rating
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300">{testimonial?.message}</p>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}

      <div className="flex justify-center items-center">
        <button
          onClick={() => setIsModelOpen(true)}
          className={`${
            alltestimonials.length === 0 ? "-mt-6 " : "mt-4"
          } bg-[--bs-blur-bg] transition-colors duration-200 hover:bg-purple-700 hover:text-white text-[var(--bs-text)] px-6 py-2 rounded-lg font-bold`}
        >
          Share you experiences
        </button>

        {isModelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            {isLoading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center space-x-2 animate-spin">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            )}
            <div className="bg-[var(--bs-card-bg)] rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in border border-gray-800">
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
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formdata.name}
                    onChange={(e) =>
                      setFormData({ ...formdata, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                    text-gray-200 placeholder-gray-500
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Share your thoughts..."
                  />
                </div>
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
                  <textarea
                   minLength="20"
                   maxLength="50"
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
                  className="bg-[--bs-blur-bg] transition-colors duration-200 hover:bg-purple-700 hover:text-white text-[var(--bs-text)] px-6 py-2 rounded-lg font-bold"
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
