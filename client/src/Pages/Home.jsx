import {
  HeroSection,
  BookCab,
  Package,
  AllDestinationCard,
  Hotel,
  Testimonial,
} from "../components";

import { useHomeLayoutContext } from "../outlets/HomeOutlet";

const Home = () => {
  const { user } = useHomeLayoutContext();
  return (
    <section className="space-y-16">
      <HeroSection />
      <BookCab />
      <Package />
      <h1 className="font-sans font-bold  text-center text-[var(--bs-white)]">
        Our Best Destinations
      </h1>
      <div className=" container grid grid-cols-2 lg:grid-cols-5 place-items-center gap-4 ">
        {user &&
          user?.destinations?.map((destination) => (
            <div key={destination._id}>
              <AllDestinationCard
                key={destination._id}
                destination={destination}
              />
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
