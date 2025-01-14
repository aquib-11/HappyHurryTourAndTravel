import { HeroSection, BookCab, Package, AllDestinationCard, Hotel, Testimonial } from "../components";
const destinations = [
  {
    destinationName: "Srinagar",
    title: "The Heart of Kashmir",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Dal_Lake_%28Kashmir%29.jpg/1200px-Dal_Lake_%28Kashmir%29.jpg",
      },
    ],
    overview: "Experience the serene beauty of Dal Lake and the Mughal Gardens in Srinagar.",
    _id: "destination-1",
    highlights: ["Dal Lake Shikara Ride", "Mughal Gardens", "Local Handicrafts"],
    updatedAt: new Date().toISOString(),
  },
  {
    destinationName: "Gulmarg",
    title: "Meadow of Flowers",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Gulmarg_Winter.jpg/1024px-Gulmarg_Winter.jpg",
      },
    ],
    overview: "Famous for its scenic landscapes and winter sports, Gulmarg is a paradise for adventurers.",
    _id: "destination-2",
    highlights: ["Gondola Ride", "Skiing", "Alpine Meadows"],
    updatedAt: new Date().toISOString(),
  },
  {
    destinationName: "Pahalgam",
    title: "Valley of Shepherds",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pahalgam_Valley.jpg/1200px-Pahalgam_Valley.jpg",
      },
    ],
    overview: "A tranquil retreat known for its lush greenery and the Lidder River.",
    _id: "destination-3",
    highlights: ["Aru Valley", "Betaab Valley", "River Rafting"],
    updatedAt: new Date().toISOString(),
  },
  {
    destinationName: "Sonmarg",
    title: "Meadow of Gold",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sonmarg_%28Kashmir%29.jpg/1200px-Sonmarg_%28Kashmir%29.jpg",
      },
    ],
    overview: "A breathtaking destination known for its pristine glaciers and trekking routes.",
    _id: "destination-4",
    highlights: ["Thajiwas Glacier", "Zoji La Pass", "Trekking Trails"],
    updatedAt: new Date().toISOString(),
  },
  {
    destinationName: "New Place ",
    title: "Meadow of Gold",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sonmarg_%28Kashmir%29.jpg/1200px-Sonmarg_%28Kashmir%29.jpg",
      },
    ],
    overview: "A breathtaking destination known for its pristine glaciers and trekking routes.",
    _id: "destination-5",
    highlights: ["Thajiwas Glacier", "Zoji La Pass", "Trekking Trails"],
    updatedAt: new Date().toISOString(),
  },
];


const Home = () => {

  return (
    <section className="space-y-16" >
      <HeroSection />
      <BookCab />
      <Package />
      <h1 className="font-sans font-bold  text-center text-[var(--bs-white)]">
          Our Best Destinations
        </h1>
      <div className=" container grid grid-cols-2 lg:grid-cols-5 place-items-center gap-4 ">
       
        {destinations.map((destination) => (
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
