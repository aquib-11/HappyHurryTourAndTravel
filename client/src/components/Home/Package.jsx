import React from "react";
import img1 from "../../assets/images/bg6.jpg";
import img2 from "../../assets/images/bg5.jpg";
import img3 from "../../assets/images/bg7.jpg";
import img4 from "../../assets/images/bg3.jpg";

const TravelPackages = () => {
  const packages = [
    {
      id: 1,
      image: img1,
      category: "Adventure",
      rating: 4.3,
      duration: "5 days / 6 nights",
      destination: "Lombok, Indonesia",
      price: 1385,
      backgroundColor: "from-pink-200 to-pink-300",
    },
    {
      id: 2,
      image: img2,
      category: "History",
      rating: 4.5,
      duration: "8 days / 7 nights",
      destination: "Northern Lights Escape",
      price: 2569,
      backgroundColor: "from-orange-200 to-orange-300",
    },
    {
      id: 3,
      image: img3,
      category: "Desert",
      rating: 4.2,
      duration: "9 days / 8 nights",
      destination: "Essential Egypt",
      price: 1885,
      backgroundColor: "from-gray-200 to-gray-300",
    },
    {
      id: 4,
      image: img4,
      category: "Beach",
      rating: 4.6,
      duration: "9 days / 8 nights",
      destination: "Phi Phi Islands",
      price: 3585,
      backgroundColor: "from-cyan-200 to-cyan-300",
    },
  ];

  return (
    <div className="container ">
      <h1 className="font-sans font-bold text-white text-center mb-8">
        Our Best Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative rounded-xl overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden rounded-xl">
              <img
                src={pkg.image}
                alt={pkg.destination}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />

              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {pkg.duration}
                </span>
              </div>
            </div>
            <div className="p-4 ">
              <h3 className="text-xl font-bold text-indigo-400 font-sans  mb-2">
                {pkg.destination}
              </h3>
              <div className="flex items-baseline">
                <span className="text-green-400 text-xl font-bold">
                  ₨: {pkg.price}
                </span>
                <span className="ml-2 text-gray-400 text-sm">
                  Starting price
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPackages;
