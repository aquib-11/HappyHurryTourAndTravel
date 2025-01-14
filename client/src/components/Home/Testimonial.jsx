import React from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonial = () => {
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

  return (
    <div className="container ">
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
    </div>
  );
};

export default Testimonial;