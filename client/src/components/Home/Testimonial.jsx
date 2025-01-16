import React, { useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';

const Testimonial = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formdata, setFormData] = useState({
    name: user?.name,
    rating: "",
    email: user?.email,
    message: '',
  });
  const testimonials = [
    {
      name: 'Sara Jay',
      role: 'Traveller',
      rating: 5,
      text: 'Before we define any approach, we need to define the brands overall goal. We then need to dive.',
    },
    {
      name: 'Cristian Daniel',
      role: 'Traveller',
      rating: 5,
      text: 'Before we define any approach, we need to define the brands overall goal. We then need to dive.',
    },
    {
      name: 'Kausar Hasan',
      role: 'Traveller',
      rating: 5,
      text: 'Before we define any approach, we need to define the brands overall goal. We then need to dive.',
    },
    {
      name: 'John Doe',
      role: 'Traveller',
      rating: 4,
      text: 'Before we define any approach, we need to define the brands overall goal. We then need to dive.',
    },
  ];

  const splideOptions = {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    gap: '2rem',
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

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to book a cab");
      return
    } 
    try {
     await customFetch.post("/testimonial", formdata);
    toast.success(" Thanks for your review");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
    finally {
      setFormData({
        message: "",
        rating: "",
        email: "",
        name: "",
      });
      setIsModelOpen(false);
    }
  };
console.log({formdata});
  return (
    <div className="relative container ">
      <div>
        <div className="flex justify-center items-center mb-8">
          <div className="text-center">
            <p className="text-[var(--bs-text)] uppercase font-sans text-sm tracking-wider mb-2">TESTIMONIAL</p>
            <h1 className=" font-bold font-sans text-white">What our client say</h1>
            <p className="text-gray-400 mt-2 font-sans">Hear what our clients say about their experiences and the value we deliver.    </p>
          </div>
        </div>

        <Splide options={splideOptions}>
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={index} className="flex justify-center">
              <div className="bg-[var(--bs-card-bg)] rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--bs-text)] text-white font-bold text-3xl flex items-center justify-center">
                    {testimonial.name.split(' ').map((name) => name[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <button onClick={() => setIsModelOpen(true)} className="">
        review us
      </button>
     {isModelOpen && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-600 p-4 ">
     <span onClick={() => setIsModelOpen(false)} className="absolute top-2 right-2 cursor-pointer">&times;</span>
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              rating
            </label>
            <input
              type="range"
              id="rating"
              value={formdata.rating}
              onChange={(e) => setFormData({ ...formdata, rating: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="1"
              max="5"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <input
              type="text"
              id="message"
              value={formdata.message}
              onChange={(e) => setFormData({ ...formdata, message: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
      </form>
      </div>}
    </div>
  );
};

export default Testimonial;