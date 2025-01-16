import { useEffect, useState } from "react";
import { HeroSection, BookCab, Package, AllDestinationCard, Hotel, Testimonial } from "../components";
import customFetch from "../utils/customFetch";

const Home = () => {
const [allDestinations , setAllDestinations] =useState([])

const fetchDestinations =async() =>{
  try {
    const {data} = await customFetch.get("/destination");
    setAllDestinations(data.destinations);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}
useEffect(() => {
  fetchDestinations();
},[])
  return (
    <section className="space-y-16" >
      <HeroSection />
      <BookCab />
      <Package />
      <h1 className="font-sans font-bold  text-center text-[var(--bs-white)]">
          Our Best Destinations
        </h1>
      <div className=" container grid grid-cols-2 lg:grid-cols-5 place-items-center gap-4 ">
       
        {allDestinations.map((destination) => (
          <div key={destination._id} >
            <AllDestinationCard key={destination._id} destination={destination} />
          </div>
        ))}
      </div>
      <Hotel />
      <Testimonial />
      {/* <SpecialOffers /> */}
    </section>
  );
};
export default Home;
